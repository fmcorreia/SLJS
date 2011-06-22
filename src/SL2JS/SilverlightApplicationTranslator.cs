using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using JSIL;
using Mono.Cecil;
using SL2JS.Proxies;

namespace SL2JS
{
    public class SilverlightApplicationTranslator
    {
        private readonly SilverlightApplicationTranslatorConfiguration configuration;
        private readonly ResourceFileTranslator resourceFileTranslator;

        private static readonly string[] BootstrapJs = new[]
                                                          {
                                                              "jquery-1.6.1.js",
                                                              "lazyload.js",
                                                              "sljs.js"
                                                          };

        private static readonly string[] CoreJs = new[]
                                                          {
                                                              "JSIL.Core.js",
                                                              "JSIL.Bootstrap.js",
                                                              "jquery.tmpl.js",
                                                              "knockout.js"
                                                          };
        private static readonly string[] PatchJs = new[]
                                                          {
                                                              "patches.js"
                                                          };

        public SilverlightApplicationTranslator(SilverlightApplicationTranslatorConfiguration configuration, ResourceFileTranslator resourceFileTranslator)
        {
            this.configuration = configuration;
            this.resourceFileTranslator = resourceFileTranslator;
        }

        public void ProcessWith(SilverlightAssemblyTranslator translator)
        {
            ProcessAssembly(translator);
            ProcessResources();
            GenerateContainer(translator);
        }
        
        private void GenerateContainer(SilverlightAssemblyTranslator translator)
        {
            var container = File.ReadAllText("container.html");

            var applicationEntrypoint = translator.GetEntrypointNameFromAssembly(configuration.Filename);
            var dependencies = GetJavascriptFilenames()
                .Select(x => string.Format("'{0}'", x))
                .ToArray();
           
            var configurationDirectiveBuilder = new StringBuilder();
            configurationDirectiveBuilder.AppendLine("sljsconfig = {");
            configurationDirectiveBuilder.AppendFormat("entryPoint: '{0}',", applicationEntrypoint).AppendLine();
            configurationDirectiveBuilder.AppendFormat("files: [{0}]", string.Join("\r\n,", dependencies)).AppendLine();
            configurationDirectiveBuilder.AppendLine("};");

            container = container.Replace("{configuration}", configurationDirectiveBuilder.ToString());
            File.WriteAllText(Path.Combine(configuration.OutputDirectory, "index.html"), container);
        }

        private IEnumerable<string> GetJavascriptFilenames()
        {
            var filesInOutputDirectory = Directory.GetFiles(configuration.OutputDirectory, "*.js")
                .Select(Path.GetFileName);

            var applicationFiles = filesInOutputDirectory
                .Where(file =>  !BootstrapJs.Contains(file, StringComparer.InvariantCultureIgnoreCase) && 
                                !CoreJs.Contains(file, StringComparer.InvariantCultureIgnoreCase) &&
                                !PatchJs.Contains(file, StringComparer.InvariantCultureIgnoreCase))
                .ToArray();

            foreach (var standardFile in CoreJs)
            {
                yield return standardFile;
            }

            foreach(var file in applicationFiles)
            {
                yield return file;
            }

            foreach (var standardFile in PatchJs)
            {
                yield return standardFile;
            }
        }

        private void ProcessResources()
        {
            var resourceFolderName = Path.GetFileNameWithoutExtension(configuration.Filename);
            var resourceFolder = Path.Combine(configuration.OutputDirectory, resourceFolderName);

            foreach (var file in Directory.GetFiles(resourceFolder, "*.resources"))
            {
                resourceFileTranslator.Translate(file, configuration.OutputDirectory);
            }
        }

        private void ProcessAssembly(SilverlightAssemblyTranslator translator)
        {
            translator.OutputDirectory = configuration.OutputDirectory;
            translator.IncludeDependencies = configuration.IncludeDependencies;
            translator.AddProxyAssembly(typeof (Application).Assembly, false);
            translator.Translate(configuration.Filename);
        }
    }
}
