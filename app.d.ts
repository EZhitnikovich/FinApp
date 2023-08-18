/// <reference types="nativewind/types" />

BigInt.prototype.toJSON = function () {
  return this.toString();
};
