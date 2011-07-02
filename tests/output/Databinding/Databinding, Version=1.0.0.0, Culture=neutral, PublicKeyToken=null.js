/* Generated by JSIL v0.2.0 build 17160. See http://jsil.org/ for more information. */ 
var $asm01 = JSIL.DeclareAssembly("Databinding, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null");
JSIL.DeclareNamespace("Databinding");
JSIL.MakeClass("System.Windows.Controls.UserControl", "Databinding.MainPage", true);

JSIL.MakeClass("System.Windows.Application", "Databinding.App", true);
JSIL.MakeClass("System.Object", "Databinding.App/$l$gc__DisplayClass2", false);


JSIL.MakeClass("System.Object", "Databinding.Model", true);

Databinding.MainPage.prototype.InitializeComponent = function () {
	if (!this._contentLoaded) {
		this._contentLoaded = true;
		System.Windows.Application.LoadComponent(this, (new System.Uri("/Databinding;component/MainPage.xaml", System.UriKind.Relative)));
		this.LayoutRoot = JSIL.Cast(System.Windows.FrameworkElement.prototype.FindName.call(this, "LayoutRoot"), System.Windows.Controls.Grid);
		this.txtOneTime = JSIL.Cast(System.Windows.FrameworkElement.prototype.FindName.call(this, "txtOneTime"), System.Windows.Controls.TextBox);
		this.lblOneTime = JSIL.Cast(System.Windows.FrameworkElement.prototype.FindName.call(this, "lblOneTime"), System.Windows.Controls.TextBlock);
		this.txtOneWay = JSIL.Cast(System.Windows.FrameworkElement.prototype.FindName.call(this, "txtOneWay"), System.Windows.Controls.TextBox);
		this.lblOneWay = JSIL.Cast(System.Windows.FrameworkElement.prototype.FindName.call(this, "lblOneWay"), System.Windows.Controls.TextBlock);
		this.txtTwoWay = JSIL.Cast(System.Windows.FrameworkElement.prototype.FindName.call(this, "txtTwoWay"), System.Windows.Controls.TextBox);
		this.lblTwoWay = JSIL.Cast(System.Windows.FrameworkElement.prototype.FindName.call(this, "lblTwoWay"), System.Windows.Controls.TextBlock);
	}
};
Databinding.MainPage.prototype._ctor = function () {
	System.Windows.Controls.UserControl.prototype._ctor.call(this);
	this.InitializeComponent();
	this.model = (new Databinding.Model()).__Initialize__({
			StringProperty: "InitialValue"}
	);
	System.Windows.FrameworkElement.prototype.set_DataContext.call(this, this.model);
};
Databinding.MainPage.prototype.LayoutRoot = null;
Databinding.MainPage.prototype.txtOneTime = null;
Databinding.MainPage.prototype.lblOneTime = null;
Databinding.MainPage.prototype.txtOneWay = null;
Databinding.MainPage.prototype.lblOneWay = null;
Databinding.MainPage.prototype.txtTwoWay = null;
Databinding.MainPage.prototype.lblTwoWay = null;
Databinding.MainPage.prototype._contentLoaded = false;
Databinding.MainPage.prototype.model = null;

Databinding.App.prototype.InitializeComponent = function () {
	if (!this._contentLoaded) {
		this._contentLoaded = true;
		System.Windows.Application.LoadComponent(this, (new System.Uri("/Databinding;component/App.xaml", System.UriKind.Relative)));
	}
};
Databinding.App.prototype._ctor = function () {
	System.Windows.Application.prototype._ctor.call(this);
	System.Windows.Application.prototype.add_Startup.call(this, JSIL.Delegate.New("System.Windows.StartupEventHandler", this, Databinding.App.prototype.Application_Startup));
	System.Windows.Application.prototype.add_Exit.call(this, JSIL.Delegate.New("System.EventHandler", this, Databinding.App.prototype.Application_Exit));
	System.Windows.Application.prototype.add_UnhandledException.call(this, JSIL.Delegate.New("System.EventHandler`1[System.Windows.ApplicationUnhandledExceptionEventArgs]", this, Databinding.App.prototype.Application_UnhandledException));
	this.InitializeComponent();
};
Databinding.App.prototype.Application_Startup = function (sender, e) {
	System.Windows.Application.prototype.set_RootVisual.call(this, (new Databinding.MainPage()));
};
Databinding.App.prototype.Application_Exit = function (sender, e) {
};
Databinding.App.prototype.Application_UnhandledException = function (sender, e) {
	var $l$gc__DisplayClass = new $asm01.Databinding.App.$l$gc__DisplayClass2();
	$l$gc__DisplayClass.e = e;
	$l$gc__DisplayClass.$this = this;
	if (!System.Diagnostics.Debugger.IsAttached) {
		$l$gc__DisplayClass.e.Handled = true;
		System.Windows.Deployment.Current.Dispatcher.BeginInvoke$0(function () {
				$l$gc__DisplayClass.$this.ReportErrorToDOM($l$gc__DisplayClass.e);
			});
	}
};
Databinding.App.prototype.ReportErrorToDOM = function (e) {
	try {
		var errorMsg = ((e.ExceptionObject.Message + e.ExceptionObject.StackTrace));
		errorMsg = errorMsg.Replace$0('"', "'").Replace$1("\r\n", "\\n");
		System.Windows.Browser.HtmlPage.Window.Eval(('throw new Error("Unhandled Error in Silverlight Application ' + errorMsg + '");'));
	} catch ($exception) {
	}
};
Databinding.App.prototype._contentLoaded = false;

$asm01.Databinding.App.$l$gc__DisplayClass2.prototype._ctor = function () {
	System.Object.prototype._ctor.call(this);
};
$asm01.Databinding.App.$l$gc__DisplayClass2.prototype.$this = null;
$asm01.Databinding.App.$l$gc__DisplayClass2.prototype.e = null;

Databinding.Model.prototype.get_StringProperty = function () {
	return this.backingValue;
};
Databinding.Model.prototype.set_StringProperty = function (value) {
	this.backingValue = value;
	this.OnPropertyChanged("StringProperty");
};
Databinding.Model.prototype.OnPropertyChanged = function (name) {
	var ev = this.PropertyChanged;
	if (ev !== null) {
		ev(this, new System.ComponentModel.PropertyChangedEventArgs(name));
	}
};
Databinding.Model.prototype.add_PropertyChanged = function (value) {
	var propertyChangedEventHandler = this.PropertyChanged;
__loop0__: 
	do {
		var propertyChangedEventHandler2 = propertyChangedEventHandler;
		var value2 = System.Delegate.Combine(propertyChangedEventHandler2, value);
		propertyChangedEventHandler = System.Threading.Interlocked.CompareExchange$b1(System.ComponentModel.PropertyChangedEventHandler)(/* ref */ new JSIL.MemberReference(this, "PropertyChanged"), value2, propertyChangedEventHandler2);
	} while (propertyChangedEventHandler !== propertyChangedEventHandler2);
};
Databinding.Model.prototype.remove_PropertyChanged = function (value) {
	var propertyChangedEventHandler = this.PropertyChanged;
__loop0__: 
	do {
		var propertyChangedEventHandler2 = propertyChangedEventHandler;
		var value2 = System.Delegate.Remove(propertyChangedEventHandler2, value);
		propertyChangedEventHandler = System.Threading.Interlocked.CompareExchange$b1(System.ComponentModel.PropertyChangedEventHandler)(/* ref */ new JSIL.MemberReference(this, "PropertyChanged"), value2, propertyChangedEventHandler2);
	} while (propertyChangedEventHandler !== propertyChangedEventHandler2);
};
Databinding.Model.prototype._ctor = function () {
	System.Object.prototype._ctor.call(this);
};
JSIL.MakeProperty(Databinding.Model.prototype, "StringProperty", 
	Databinding.Model.prototype.get_StringProperty, Databinding.Model.prototype.set_StringProperty);
Databinding.Model.prototype.backingValue = null;
Databinding.Model.prototype.PropertyChanged = null;

JSIL.QueueInitializer(function () {
		JSIL.ImplementInterfaces(Databinding.Model, [
				"System.ComponentModel.INotifyPropertyChanged"
			]);
	});
