JSIL.DeclareAssembly("System.Windows");
JSIL.DeclareNamespace("System.Windows");
JSIL.DeclareNamespace("System.Windows.Controls");

System.Windows = System.Windows || {};
System.Windows.Controls = System.Windows.Controls || {};

JSIL.MakeClass(Object, "System.Windows.MessageBox", true);
System.Windows.MessageBox.Show = function (msg) {
    alert(msg);
};

GlobalEvents = {
    OnStartup: 0,
    OnExit: 1,
    OnUnhandledException: 2
};

JSIL.MakeClass(Object, "System.Windows.Application", true);
Class.setup(System.Windows.Application, {
    _ctor: function () { },
    add_Startup: function (handler) {
        this.addEventHandler(this, GlobalEvents.OnStartup, handler);
    },
    add_Exit: function (handler) {
        this.addEventHandler(this, GlobalEvents.OnExit, handler);
    },
    add_UnhandledException: function (handler) {
        this.addEventHandler(this, GlobalEvents.OnUnhandledException, handler);
    },
    notifyStartup: function () {
        this.raiseEvent(this, GlobalEvents.OnStartup, {});
    },
    set_RootVisual: function (control) {
        $(sljs.Renderer.render(control)).appendTo('#container');
    },
    $Events: [
        GlobalEvents.OnStartup,
        GlobalEvents.OnExit,
        GlobalEvents.OnUnhandledException
    ]
});

System.Windows.Application.LoadComponent = function (component, resource) {
    var resourceName = resource.toString();
    var hackyStringIndex = resourceName.indexOf('component/');

    var resourceNameAsXaml = resourceName.substr(hackyStringIndex + 'component/'.length);
    var resourceNameAsJson = resourceNameAsXaml.replace('xaml', 'json');

    var data = sljs.getXaml(resourceNameAsJson);
    System.Windows.Application.mapPropertiesIntoTarget(component, component, data);
};

System.Windows.Application.mapPropertiesIntoTarget = function (component, target, data) {
    component.$data = data;
    for (key in data) {
        if (key == '$Elements') {
            System.Windows.Application.addChildrenToTarget(component, target, data[key]);
        }
        else if (key == "$ElementType") continue;
        else {
            if(this.attemptToWireUpProperty(component, target, key, data[key]))  {
                continue;
            }
            else if(this.attemptToWireUpEvent(component, target, key, data[key])) {
                continue;
            }
            else{ 
                console.warn("Unable to find anything to do with " + key + " on " + target.GetType());
            }            
        }
    }
};

System.Windows.Application.attemptToWireUpEvent = function (component, target, key, value) {
    var event = System.Windows.Application.findEventInTarget(target, key);
    if (!event) {
        return false;
    }
    else {
        event.addHandler(target, key, function(sender, args) {
            component[value](sender, args);
        });
        console.log("Set event: " + key + " on " + target.GetType() + " to " + value);
        return true;
    }
};

System.Windows.Application.attemptToWireUpProperty = function (component, target, key, value) {
    var property = System.Windows.Application.findPropertyInTarget(target, key);
    if (!property) {
        return false;
    }
    else {
        target.SetValue(property, value);
        console.log("Set property: " + key + " on " + target.GetType() + " to " + value);
        return true;
    }
};

System.Windows.Application.addChildrenToTarget = function (component, target, elements) {
    var childrenProperty = this.findPropertyInTarget(target, "Children");
    var contentProperty = this.findPropertyInTarget(target, "Content");
    var children = null;
    if (childrenProperty) {
        children = new System.Windows.Controls.UIElementCollection();
        target.SetValue(childrenProperty, children);
    }

    for (var i = 0; i < elements.length; i++) {
        var element = elements[i];
        var child = System.Windows.Application.createChild(component, element);
        if (child == null) { continue; }

        System.Windows.Application.mapPropertiesIntoTarget(component, child, element);
        if (childrenProperty) {
            children.Add(child);
        }
        else if (contentProperty) {
            target.SetValue(contentProperty, child);
        }
        else {
            console.warn("Unable to find somewhere to place the control: " + child.Name + " " + child.GetType());
        }
    }
};

System.Windows.Application.createChild = function (component, data) {
    var controlType = "System.Windows.Controls." + data["$ElementType"];
    var factoryFunc = new Function("return new " + controlType + "()");
    var control = null;

    try {
        control = factoryFunc();
    } catch (ex) {
        console.log("Failed to create instance of: " + controlType);
    }
    return control;
};

System.Windows.Application.findPropertyInTarget = function (target, name) {
    return System.Windows.Application.findPropertyInType(target.GetType(), name);
};

System.Windows.Application.findPropertyInType = function (type, name) {
    var propertyName = name + "Property";
    return this.findNameInType(type, propertyName);
};

System.Windows.Application.findEventInTarget = function (target, name) {
    return System.Windows.Application.findEventInType(target.GetType(), name);
};

System.Windows.Application.findEventInType = function (type, name) {
    if(!type) return null;
    var eventTable = type["$eventTable"];
    if(eventTable && eventTable.isKnownEvent(name)) {
        return eventTable;
    }
    return this.findEventInType(type.prototype.__BaseType__, name);
};

System.Windows.Application.findNameInType = function (type, name) {
    if (!type) return null;
    var property = type[name];
    if (property) return property;
    return this.findNameInType(type.prototype.__BaseType__, name);
};

JSIL.MakeClass(Object, "System.Windows.DependencyObject", true);
Class.setup(System.Windows.DependencyObject, {
 SetValue: function(property, value) {
      if (!property) {
         console.warn("Attempt to set missing dependency property on type: " + this.GetType());
         return;
     }
     this["$$$" + property.name] = value;
 },
 GetValue: function(property) {
      if (!property) {
         console.warn("Attempt to read missing dependency property on type: " + this.GetType());
         return null;
     }
     return this["$$$" + property.name];
 },
 AddEventListener: function () {
     console.warn("AddEventListener not implemented");
 },
 RemoveEventListener: function () {
     console.warn("RemoveEventListener not implemented");
 } 
});

DependencyPropertyDictionary = function () { }
Class.setup(DependencyPropertyDictionary, {
    set_Item: function(key, value) {
        this[key] = value;
    },
    get_Item: function(key) {
        return this[key];
    }
});

JSIL.MakeClass(Object, "System.Windows.DependencyProperty", true);
Class.setup(System.Windows.DependencyProperty, {
    _ctor: function(typeIndex, name, propertyType, ownerType, metadata, isAttached, isReadonly) {
        this.typeIndex = typeIndex;
        this.name = name;
        this.propertyType = propertyType;
        this.ownerType = ownerType;
        this.metadata = metadata;
        this.isAttached = isAttached;
        this.isReadonly = isReadonly;
        console.info("Property created with name: " + name);
    }
});

System.Windows.DependencyProperty._registeredCoreProperties = new DependencyPropertyDictionary();
System.Windows.DependencyProperty._registeredProperties = new DependencyPropertyDictionary();
System.Windows.DependencyProperty.RegisterCoreProperty = function(typeIndex, type) {
    var property = new System.Windows.DependencyProperty(typeIndex, "", type);
    System.Windows.DependencyProperty._registeredCoreProperties.set_Item(typeIndex, property);
    return property;
};
System.Windows.DependencyProperty.Register = function(name, propertyType, ownerType, metadata) {
    return System.Windows.DependencyProperty.RegisterImpl(name, propertyType, ownerType, metadata, false, false);
};
System.Windows.DependencyProperty.RegisterReadonly = function(name, propertyType, ownerType, metadata) {
    return System.Windows.DependencyProperty.RegisterImpl(name, propertyType, ownerType, metadata, false, true);
};
System.Windows.DependencyProperty.RegisterAttached = function(name, propertyType, ownerType, metadata) {
    return System.Windows.DependencyProperty.RegisterImpl(name, propertyType, ownerType, metadata, true, false);
};
System.Windows.DependencyProperty.RegisterAttachedReadonly = function(name, propertyType, ownerType, metadata) {
    return System.Windows.DependencyProperty.RegisterImpl(name, propertyType, ownerType, metadata, true, true);
};
System.Windows.DependencyProperty.RegisterImpl = function(name, propertyType, ownerType, metadata, isAttached, isReadonly) {
    var property = new System.Windows.DependencyProperty(null, name, propertyType, ownerType, metadata, isAttached, isReadonly);
    System.Windows.DependencyProperty._registeredProperties.set_Item(name + ownerType, property);
    return property;
};

JSIL.MakeClass(System.Windows.DependencyObject, "System.Windows.Controls.UIElementCollection", true); // This is going to be complex eventually
Class.setup(System.Windows.Controls.UIElementCollection, {
    _ctor: function () {
        this.items = [];
    },
    Add: function(item) {
        this.items.push(item);
        this.NotifyCountChanged();
    },
    NotifyCountChanged: function() {
        // No idea how to raise events just yet, so
        this.Count = this.items.length;
    },
    ElementAt: function(index) {
        return this.items[index];
    },
    $CountProperty: System.Int32
});

JSIL.MakeClass(System.Windows.DependencyObject, "System.Windows.UIElement", true);
Class.setup(System.Windows.UIElement, {
    _ctor: function () {

    },
    $WidthProperty: System.Int32,
    $HeightProperty: System.Int32,
    $VerticalAlignmentProperty: System.String,
    $MarginProperty: System.String,
    $HorizontalAlignmentProperty: System.String,
    $BackgroundProperty: System.String,
    $ContentProperty: System.String
});

JSIL.MakeClass(System.Windows.UIElement, "System.Windows.FrameworkElement", true);
Class.setup(System.Windows.FrameworkElement, {
    _ctor: function () {

    },
    FindName: function (name) {
         if (this.Name == name) return this;
        var needle = null;
        var haystack = null;
         // Find the content property on this level of framework element
         var childrenProperty = System.Windows.Application.findPropertyInTarget(this, "Children");
         var contentProperty = System.Windows.Application.findPropertyInTarget(this, "Content");
         
         if (childrenProperty != null) {
             var childrenElement = this.GetValue(childrenProperty);
             for (var i = 0; i < childrenElement.Count; i++) {
                 haystack = childrenElement.ElementAt(i);
                 needle = haystack.FindName(name);
                 if (needle) break;
             }
         }
         else if (contentProperty != null) {
             haystack = this.GetValue(contentProperty);
             needle = haystack.FindName(name);
         }
         else console.warn("FindName couldn't find a property to use");

         if (needle) {
             console.info("Found element " + name);
         }
         else {
             console.warn("Couldn't find element: " + name);
         }
         return needle;
    },
    $NameProperty: System.String
});


JSIL.MakeClass(System.Windows.FrameworkElement, "System.Windows.Controls.Control", true);
Class.setup(System.Windows.Controls.Control, {
    _ctor: function () {

    }
});



JSIL.MakeClass(System.Windows.Controls.Control, "System.Windows.Controls.ContentControl", true);
Class.setup(System.Windows.Controls.ContentControl, {
    _ctor: function () {

    },
    $ContentProperty: System.Windows.Controls.UIElement
});

JSIL.MakeClass(System.Windows.Controls.ContentControl, "System.Windows.Controls.UserControl", true);
Class.setup(System.Windows.Controls.UserControl, {
    _ctor: function () {

    }
});

JSIL.MakeClass(System.Windows.Controls.Control, "System.Windows.Controls.Grid", true);
Class.setup(System.Windows.Controls.Grid, {
    _ctor: function () {

    },
    Items: function () {
        return this.Children.items;
    },
    $ChildrenProperty: System.Windows.Controls.UIElementCollection
});


JSIL.MakeClass(System.Windows.Controls.Control, "System.Windows.Controls.Button", true);
Class.setup(System.Windows.Controls.Button, {
    _ctor: function () {

    },
    $Events: [
        "Click"
    ]
});