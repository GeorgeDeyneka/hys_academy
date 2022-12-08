function ReadOnly(boolean: boolean) {
  return function (
    target: Object,
    key: string,
    descriptors: TypedPropertyDescriptor<() => Promise<void>>
  ) {
    descriptors.writable = !boolean;
  };
}

function SessionStorageDec(target: Object, key: string): void {
  target["arrMethods"] = [];

  const saveSessionStorage = <T>(data: T, keyData: string): void => {
    sessionStorage.setItem(keyData, JSON.stringify(data));
  };

  target["arrMethods"].push(saveSessionStorage);

  Object.defineProperty(target, key, {
    get: function <T>(): T {
      if (sessionStorage.getItem(this.key) != null) {
        return (JSON.parse(sessionStorage.getItem(this.key)) as T);
      }
    },
    configurable: true,
  });
}


function LocalStorageDec(target: Object, key: string): void {
  const saveLocalStorage = <T>(data: T, keyData: string): void => {
    localStorage.setItem(keyData, JSON.stringify(data));
  };

  target["arrMethods"].push(saveLocalStorage);

  Object.defineProperty(target, key, {
    get: function <T>(): T {
      if (localStorage.getItem(this.key) != null) {
        return (JSON.parse(localStorage.getItem(this.key)) as T);
      }
    },

    set: function (data) {
      const keyData = this.key;
      target["arrMethods"].forEach((el) => {
        el.call(this, data, keyData);
      });
    },
    configurable: true,
  });
}

export { ReadOnly, SessionStorageDec, LocalStorageDec };
