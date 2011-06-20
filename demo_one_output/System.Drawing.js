"use strict";

if (typeof (JSIL) === "undefined")
  throw new Error("JSIL.Core required");
  
var $jsildrawing = JSIL.DeclareAssembly("JSIL.Drawing");

JSIL.DeclareNamespace("System.Drawing");

JSIL.MakeClass("System.Object", "System.Drawing.Bitmap", true);

if (JSIL.HostType.IsBrowser) {
  System.Drawing.Bitmap.prototype._ctor$0 = function (filename) {
    System.Drawing.Image.prototype._ctor.call(this);

    this.image = JSIL.Host.getImage(filename);

    this.canvas = JSIL.Host.createCanvas(this.image.naturalWidth, this.image.naturalHeight);
    this.context = this.canvas.getContext('2d');
    this.context.globalCompositeOperation = "copy";

    this.context.drawImage(this.image, 0, 0);
    /*
    try {
      this.buffer = this.context.getImageData(0, 0, this.image.naturalWidth, this.image.naturalHeight);
    } catch (e) {
      JSIL.Host.warning("Failed to read image pixels for '" + filename + "'", e);
      this.buffer = this.context.createImageData(this.image.naturalWidth, this.image.naturalHeight);
    }
    */
    this.buffer = null;
  };

  System.Drawing.Bitmap.prototype._ctor$1 = function (filename, b) {
    System.Drawing.Bitmap.prototype._ctor$0.call(this, filename);
  };

  System.Drawing.Bitmap.prototype._ctor$7 = function (width, height) {
    System.Drawing.Image.prototype._ctor.call(this);

    this.canvas = JSIL.Host.getCanvas(width, height);
    this.context = this.canvas.getContext('2d');
    this.context.globalCompositeOperation = "copy";

    this.buffer = this.context.createImageData(width, height);
    this.context.putImageData(this.buffer, 0, 0);

    this.setPixelCount = 0;
    this.flushInterval = width - 1;
  }

  System.Drawing.Bitmap.prototype._SetupContext = function (width, height) {
  };

  JSIL.OverloadedMethod(System.Drawing.Bitmap.prototype, "_ctor", [
    ["_ctor$0", [System.String]], 
    ["_ctor$1", [System.String, System.Boolean]], 
    ["_ctor$7", [System.Int32, System.Int32]]
  ]);

  System.Drawing.Bitmap.prototype.SetPixel = function (x, y, color) {
    var index = ((y * this.buffer.width) + x) * 4;
    var data = this.buffer.data;
    data[index] = color.R;
    data[index + 1] = color.G;
    data[index + 2] = color.B;
    data[index + 3] = 255;

    if (this.setPixelCount++ >= this.flushInterval) {
      this.setPixelCount = 0;
      this.context.putImageData(this.buffer, 0, 0);
    }
  }
  System.Drawing.Bitmap.prototype.Save = function (filename) {
    this.context.putImageData(this.buffer, 0, 0);
  } 
} else {
  System.Drawing.Bitmap.prototype._ctor = function (width, height) {
    this.Width = width;
    this.Height = height;
    this.Pixels = new Array(width * height);
  }
  System.Drawing.Bitmap.prototype.SetPixel = function (x, y, color) {
    if ((x < 0) || (y < 0) || (x >= this.Width) || (y >= this.Height))
      throw new Error("Coordinates out of bounds");

    this.Pixels[(y * this.Width) + x] = color;
  }
  System.Drawing.Bitmap.prototype.Save = function (filename) {
  }
}

JSIL.MakeStruct("System.Drawing.Color", true);
System.Drawing.Color.prototype.a = 0;
System.Drawing.Color.prototype.r = 0;
System.Drawing.Color.prototype.g = 0;
System.Drawing.Color.prototype.b = 0;
System.Drawing.Color.prototype.name = null;
System.Drawing.Color.prototype._ctor = function (a, r, g, b, name) {
  this.a = a;
  this.r = r;
  this.g = g;
  this.b = b;
  this.name = name;
}
System.Drawing.Color.prototype.toString = function () {
  if ((typeof (this.name) != "undefined") && (this.name != null))
    return this.name;
  else
    return System.String.Format("Color({0}, {1}, {2}, {3})", this.a, this.r, this.g, this.b);
}
System.Drawing.Color.prototype.get_A = function () {
  return this.a;
}
System.Drawing.Color.prototype.get_R = function () {
  return this.r;
}
System.Drawing.Color.prototype.get_G = function () {
  return this.g;
}
System.Drawing.Color.prototype.get_B = function () {
  return this.b;
}
System.Drawing.Color.prototype.set_A = function (value) {
  this.name = null;
  this.a = value;
}
System.Drawing.Color.prototype.set_R = function (value) {
  this.name = null;
  this.r = value;
}
System.Drawing.Color.prototype.set_G = function (value) {
  this.name = null;
  this.g = value;
}
System.Drawing.Color.prototype.set_B = function (value) {
  this.name = null;
  this.b = value;
}
System.Drawing.Color.prototype.get_Name = function () {
  return this.name;
}
System.Drawing.Color.prototype.MemberwiseClone = function () {
  if ((typeof (this.name) != "undefined") && (this.name != null)) {
    return this;
  } else {
    var result = Object.create(System.Drawing.Color.prototype);
    result.a = this.a;
    result.r = this.r;
    result.g = this.g;
    result.b = this.b;
    return result;
  }
}
System.Drawing.Color.FromArgb = function () {
  if (arguments.length == 3) {
    return new System.Drawing.Color(255, arguments[0], arguments[1], arguments[2]);
  } else if (arguments.length == 4) {
    return new System.Drawing.Color(arguments[0], arguments[1], arguments[2], arguments[3]);
  } else {
    throw new Error("Expected (r, g, b) or (a, r, g, b)");
  }
};
System.Drawing.Color.get_Black = function () {
  return System.Drawing.Color.black;
};
System.Drawing.Color.get_White = function () {
  return System.Drawing.Color.white;
};
System.Drawing.Color.get_OldLace = function () {
  return System.Drawing.Color.oldLace;
};
System.Drawing.Color.get_BlueViolet = function () {
  return System.Drawing.Color.blueViolet;
};
System.Drawing.Color.get_Aquamarine = function () {
  return System.Drawing.Color.aquamarine;
};
System.Drawing.Color._cctor = function () {
  System.Drawing.Color.black = new System.Drawing.Color(0xFF, 0x0, 0x0, 0x0, "Black");
  System.Drawing.Color.white = new System.Drawing.Color(0xFF, 0xFF, 0xFF, 0xFF, "White");
  System.Drawing.Color.oldLace = new System.Drawing.Color(0xFF, 0xFD, 0xF5, 0xE6, "OldLace");
  System.Drawing.Color.blueViolet = new System.Drawing.Color(0xFF, 0x8A, 0x2B, 0xE2, "BlueViolet");
  System.Drawing.Color.aquamarine = new System.Drawing.Color(0xFF, 0x7F, 0xFF, 0xD4, "Aquamarine");
};

JSIL.MakeStruct("System.Drawing.Size", true);
System.Drawing.Size.prototype.width = 0;
System.Drawing.Size.prototype.height = 0;
System.Drawing.Size.prototype._ctor = function (w, h) {
  this.width = w;
  this.height = h;
}
System.Drawing.Size.prototype.get_Width = function () {
  return this.width;
};
System.Drawing.Size.prototype.get_Height = function () {
  return this.height;
};
System.Drawing.Size.prototype.set_Width = function (value) {
  this.width = value;
};
System.Drawing.Size.prototype.set_Height = function (value) {
  this.height = value;
};
System.Drawing.Size._cctor = function () {
  System.Drawing.Size.Empty = new System.Drawing.Size();
}

JSIL.MakeStruct("System.Drawing.Point", true);
System.Drawing.Point.prototype.x = 0;
System.Drawing.Point.prototype.y = 0;
System.Drawing.Point.prototype._ctor = function (x, y) {
  this.x = x;
  this.y = y;
}
System.Drawing.Point.prototype.get_X = function () {
  return this.x;
};
System.Drawing.Point.prototype.get_Y = function () {
  return this.y;
};
System.Drawing.Point.prototype.set_X = function (value) {
  this.x = value;
};
System.Drawing.Point.prototype.set_Y = function (value) {
  this.y = value;
};
System.Drawing.Point._cctor = function () {
  System.Drawing.Point.Empty = new System.Drawing.Point();
}

JSIL.MakeStruct("System.Drawing.Rectangle", true);
System.Drawing.Rectangle.prototype.X = 0;
System.Drawing.Rectangle.prototype.Y = 0;
System.Drawing.Rectangle.prototype.Width = 0;
System.Drawing.Rectangle.prototype.Height = 0;
System.Drawing.Rectangle.prototype._ctor = function (x, y, w, h) {
  if ((typeof (x) === "object") && (typeof (y) === "object")) {
    this.x = x.X;
    this.y = x.Y;
    this.width = y.Width;
    this.height = y.Height;
  } else {
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
  }
}
System.Drawing.Rectangle.prototype.get_X = function () {
  return this.x;
}
System.Drawing.Rectangle.prototype.get_Y = function () {
  return this.y;
}
System.Drawing.Rectangle.prototype.set_X = function (value) {
  this.x = value;
}
System.Drawing.Rectangle.prototype.set_Y = function (value) {
  this.y = value;
}
System.Drawing.Rectangle.prototype.get_Width = function () {
  return this.width;
}
System.Drawing.Rectangle.prototype.get_Height = function () {
  return this.height;
}
System.Drawing.Rectangle.prototype.set_Width = function (value) {
  this.width = value;
}
System.Drawing.Rectangle.prototype.set_Height = function (value) {
  this.height = value;
}
System.Drawing.Rectangle.prototype.get_Left = function () {
  return this.x;
}
System.Drawing.Rectangle.prototype.get_Top = function () {
  return this.y;
}
System.Drawing.Rectangle.prototype.get_Right = function () {
  return this.x + this.width;
}
System.Drawing.Rectangle.prototype.get_Bottom = function () {
  return this.y + this.height;
}
System.Drawing.Rectangle._cctor = function () {
  System.Drawing.Rectangle.Empty = new System.Drawing.Rectangle();
}
System.Drawing.Rectangle.prototype.MemberwiseClone = function () {
  var result = Object.create(System.Drawing.Rectangle.prototype);
  result.x = this.x;
  result.y = this.y;
  result.width = this.width;
  result.height = this.height;
  return result;
}

JSIL.SealTypes(
  $jsildrawing, "System.Drawing", 
  "Size", "Color", "Point", "Rectangle"
);
