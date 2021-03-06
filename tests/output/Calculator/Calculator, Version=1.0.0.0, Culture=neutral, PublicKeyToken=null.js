/* Generated by JSIL v0.2.0 build 17160. See http://jsil.org/ for more information. */ 
var $asm01 = JSIL.DeclareAssembly("Calculator, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null");
JSIL.DeclareNamespace("Calculator");
JSIL.MakeClass("System.Windows.Application", "Calculator.App", true);
JSIL.MakeClass("System.Object", "Calculator.App/$l$gc__DisplayClass2", false);


JSIL.MakeClass("System.Windows.Controls.UserControl", "Calculator.MainPage", true);

Calculator.App.prototype._ctor = function () {
	System.Windows.Application.prototype._ctor.call(this);
	System.Windows.Application.prototype.add_Startup.call(this, JSIL.Delegate.New("System.Windows.StartupEventHandler", this, Calculator.App.prototype.Application_Startup));
	System.Windows.Application.prototype.add_Exit.call(this, JSIL.Delegate.New("System.EventHandler", this, Calculator.App.prototype.Application_Exit));
	System.Windows.Application.prototype.add_UnhandledException.call(this, JSIL.Delegate.New("System.EventHandler`1[System.Windows.ApplicationUnhandledExceptionEventArgs]", this, Calculator.App.prototype.Application_UnhandledException));
	this.InitializeComponent();
};
Calculator.App.prototype.Application_Startup = function (sender, e) {
	System.Windows.Application.prototype.set_RootVisual.call(this, (new Calculator.MainPage()));
};
Calculator.App.prototype.Application_Exit = function (sender, e) {
};
Calculator.App.prototype.Application_UnhandledException = function (sender, e) {
	var $l$gc__DisplayClass = new $asm01.Calculator.App.$l$gc__DisplayClass2();
	$l$gc__DisplayClass.e = e;
	$l$gc__DisplayClass.$this = this;
	if (!System.Diagnostics.Debugger.IsAttached) {
		$l$gc__DisplayClass.e.Handled = true;
		System.Windows.Deployment.Current.Dispatcher.BeginInvoke$0(function () {
				$l$gc__DisplayClass.$this.ReportErrorToDOM($l$gc__DisplayClass.e);
			});
	}
};
Calculator.App.prototype.ReportErrorToDOM = function (e) {
	try {
		var errorMsg = ((e.ExceptionObject.Message + e.ExceptionObject.StackTrace));
		errorMsg = errorMsg.Replace$0('"', "'").Replace$1("\r\n", "\\n");
		System.Windows.Browser.HtmlPage.Window.Eval(('throw new Error("Unhandled Error in Silverlight Application ' + errorMsg + '");'));
	} catch ($exception) {
	}
};
Calculator.App.prototype.InitializeComponent = function () {
	if (!this._contentLoaded) {
		this._contentLoaded = true;
		System.Windows.Application.LoadComponent(this, (new System.Uri("/Calculator;component/App.xaml", System.UriKind.Relative)));
	}
};
Calculator.App.prototype._contentLoaded = false;

$asm01.Calculator.App.$l$gc__DisplayClass2.prototype._ctor = function () {
	System.Object.prototype._ctor.call(this);
};
$asm01.Calculator.App.$l$gc__DisplayClass2.prototype.$this = null;
$asm01.Calculator.App.$l$gc__DisplayClass2.prototype.e = null;

Calculator.MainPage.prototype._ctor = function () {
	this.pendingAction = null;
	this.potentialAction = null;
	this.pendingValue = new (System.Nullable$b1.Of(System.Int32)) ();
	System.Windows.Controls.UserControl.prototype._ctor.call(this);
	this.InitializeComponent();
};
Calculator.MainPage.prototype.btn1_Click = function (sender, e) {
	this.Append(1);
};
Calculator.MainPage.prototype.btn2_Click = function (sender, e) {
	this.Append(2);
};
Calculator.MainPage.prototype.btn3_Click = function (sender, e) {
	this.Append(3);
};
Calculator.MainPage.prototype.btn4_Click = function (sender, e) {
	this.Append(4);
};
Calculator.MainPage.prototype.btn5_Click = function (sender, e) {
	this.Append(5);
};
Calculator.MainPage.prototype.btn6_Click = function (sender, e) {
	this.Append(6);
};
Calculator.MainPage.prototype.btn7_Click = function (sender, e) {
	this.Append(7);
};
Calculator.MainPage.prototype.btn8_Click = function (sender, e) {
	this.Append(8);
};
Calculator.MainPage.prototype.btn9_Click = function (sender, e) {
	this.Append(9);
};
Calculator.MainPage.prototype.btn0_Click = function (sender, e) {
	this.Append(0);
};
Calculator.MainPage.prototype.btnPlus_Click = function (sender, e) {
	this.Operate(function (x, y) {
			return (x + y);
		});
};
Calculator.MainPage.prototype.btnMinus_Click = function (sender, e) {
	this.Operate(function (x, y) {
			return (x - y);
		});
};
Calculator.MainPage.prototype.btnEquals_Click = function (sender, e) {
	this.Calculate();
};
Calculator.MainPage.prototype.btnDivide_Click = function (sender, e) {
	this.Operate(function (x, y) {
			return Math.floor(x / ((y === 0) ? 9.9999997473787516E-05 : y));
		});
};
Calculator.MainPage.prototype.btnMultiply_Click = function (sender, e) {
	this.Operate(function (x, y) {
			return (x * y);
		});
};
Calculator.MainPage.prototype.Calculate = function () {
	if (this.pendingValue.HasValue && (this.pendingAction !== null)) {
		var rightHandSide = System.Int32.Parse(this.txtScreen.Text);
		var result = this.pendingAction(this.pendingValue.Value, rightHandSide);
		this.txtScreen.Text = ((result).toString());
		this.pendingValue = new (System.Nullable$b1.Of(System.Int32)) ();
	}
};
Calculator.MainPage.prototype.Append = function (i) {
	if (this.potentialAction !== null) {
		this.pendingValue = new (System.Nullable$b1.Of(System.Int32)) (System.Int32.Parse(this.txtScreen.Text));
		this.txtScreen.Text = System.String.Empty;
		this.pendingAction = this.potentialAction;
		this.potentialAction = null;
	}
	var expr_55 = this.txtScreen;
	expr_55.Text = ((expr_55.Text + (i).toString()));
};
Calculator.MainPage.prototype.Operate = function (action) {
	this.Calculate();
	this.potentialAction = action;
};
Calculator.MainPage.prototype.InitializeComponent = function () {
	if (!this._contentLoaded) {
		this._contentLoaded = true;
		System.Windows.Application.LoadComponent(this, (new System.Uri("/Calculator;component/MainPage.xaml", System.UriKind.Relative)));
		this.LayoutRoot = JSIL.Cast(System.Windows.FrameworkElement.prototype.FindName.call(this, "LayoutRoot"), System.Windows.Controls.Grid);
		this.txtScreen = JSIL.Cast(System.Windows.FrameworkElement.prototype.FindName.call(this, "txtScreen"), System.Windows.Controls.TextBox);
		this.btn1 = JSIL.Cast(System.Windows.FrameworkElement.prototype.FindName.call(this, "btn1"), System.Windows.Controls.Button);
		this.btn2 = JSIL.Cast(System.Windows.FrameworkElement.prototype.FindName.call(this, "btn2"), System.Windows.Controls.Button);
		this.btn3 = JSIL.Cast(System.Windows.FrameworkElement.prototype.FindName.call(this, "btn3"), System.Windows.Controls.Button);
		this.btn4 = JSIL.Cast(System.Windows.FrameworkElement.prototype.FindName.call(this, "btn4"), System.Windows.Controls.Button);
		this.btn5 = JSIL.Cast(System.Windows.FrameworkElement.prototype.FindName.call(this, "btn5"), System.Windows.Controls.Button);
		this.btn6 = JSIL.Cast(System.Windows.FrameworkElement.prototype.FindName.call(this, "btn6"), System.Windows.Controls.Button);
		this.btn7 = JSIL.Cast(System.Windows.FrameworkElement.prototype.FindName.call(this, "btn7"), System.Windows.Controls.Button);
		this.btn8 = JSIL.Cast(System.Windows.FrameworkElement.prototype.FindName.call(this, "btn8"), System.Windows.Controls.Button);
		this.btn9 = JSIL.Cast(System.Windows.FrameworkElement.prototype.FindName.call(this, "btn9"), System.Windows.Controls.Button);
		this.btnPlus = JSIL.Cast(System.Windows.FrameworkElement.prototype.FindName.call(this, "btnPlus"), System.Windows.Controls.Button);
		this.btnMinus = JSIL.Cast(System.Windows.FrameworkElement.prototype.FindName.call(this, "btnMinus"), System.Windows.Controls.Button);
		this.btnMultiply = JSIL.Cast(System.Windows.FrameworkElement.prototype.FindName.call(this, "btnMultiply"), System.Windows.Controls.Button);
		this.btnDivide = JSIL.Cast(System.Windows.FrameworkElement.prototype.FindName.call(this, "btnDivide"), System.Windows.Controls.Button);
		this.btnEquals = JSIL.Cast(System.Windows.FrameworkElement.prototype.FindName.call(this, "btnEquals"), System.Windows.Controls.Button);
		this.btn0 = JSIL.Cast(System.Windows.FrameworkElement.prototype.FindName.call(this, "btn0"), System.Windows.Controls.Button);
	}
};
Calculator.MainPage.prototype.pendingAction = null;
Calculator.MainPage.prototype.potentialAction = null;
Calculator.MainPage.prototype.LayoutRoot = null;
Calculator.MainPage.prototype.txtScreen = null;
Calculator.MainPage.prototype.btn1 = null;
Calculator.MainPage.prototype.btn2 = null;
Calculator.MainPage.prototype.btn3 = null;
Calculator.MainPage.prototype.btn4 = null;
Calculator.MainPage.prototype.btn5 = null;
Calculator.MainPage.prototype.btn6 = null;
Calculator.MainPage.prototype.btn7 = null;
Calculator.MainPage.prototype.btn8 = null;
Calculator.MainPage.prototype.btn9 = null;
Calculator.MainPage.prototype.btnPlus = null;
Calculator.MainPage.prototype.btnMinus = null;
Calculator.MainPage.prototype.btnMultiply = null;
Calculator.MainPage.prototype.btnDivide = null;
Calculator.MainPage.prototype.btnEquals = null;
Calculator.MainPage.prototype.btn0 = null;
Calculator.MainPage.prototype._contentLoaded = false;
Calculator.MainPage.$CachedAnonymousMethodDelegate1 = null;
Calculator.MainPage.$CachedAnonymousMethodDelegate3 = null;
Calculator.MainPage.$CachedAnonymousMethodDelegate5 = null;
Calculator.MainPage.$CachedAnonymousMethodDelegate7 = null;

JSIL.QueueInitializer(function () {
		Calculator.MainPage.prototype.__StructFields__ = [
			["pendingValue", System.Nullable$b1.Of(System.Int32)]
		];
	});
