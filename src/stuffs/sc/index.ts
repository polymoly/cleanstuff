function first() {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    console.log(descriptor.value());
  };
}

export class Example {
  @first()
  method() {
    return "gholi";
  }
}
