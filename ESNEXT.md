# 紀錄從 ES6 以後的新特性
## ES7
### Object.entries()
> https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/entries
```
const object1 = {
  a: 'somestring',
  b: 42
};

for (const [key, value] of Object.entries(object1)) {
  console.log(`${key}: ${value}`);
}

// expected output:
// "a: somestring"
// "b: 42"
```
列出物件裡的結構，可搭配解構賦值操作

### String.prototype.padStart()|String.prototype.padEnd()
> https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/padStart
```
const str1 = '5';

console.log(str1.padStart(2, '0'));
// expected output: "05"

const fullNumber = '2034399002125581';
const last4Digits = fullNumber.slice(-4);
const maskedNumber = last4Digits.padStart(fullNumber.length, '*');

console.log(maskedNumber);
// expected output: "************5581"
```
填充特定的 string 至指定字數(往前或往後補齊)

## ES10
### Object.fromEntries()
> https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/fromEntries
> 跟 ES7 的 Object.entries() 剛好是相反的
**Map 轉化為 Object**
```
const map = new Map([ ['foo', 'bar'], ['baz', 42] ]);
const obj = Object.fromEntries(map);
console.log(obj); // { foo: "bar", baz: 42 }
```
**Array 轉化為 Object**
```
const arr = [ ['0', 'a'], ['1', 'b'], ['2', 'c'] ];
const obj = Object.fromEntries(arr);
console.log(obj); // { 0: "a", 1: "b", 2: "c" }
```
