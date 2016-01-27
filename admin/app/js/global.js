window.appName = "app";
window.cache = {};

String.prototype.camelCase = function() {
  return this.charAt(0).toLowerCase() + this.slice(1);
}
