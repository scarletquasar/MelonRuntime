import { Test } from "./test";
import { Assert } from "./assert";

const test = new Test("Example melon-test api Tests");
const array = [1];
const altArray = [];
const object = {a: 1};
const altObject = {};

test
  .add(Assert.true(true))
  .add(Assert.false(false))
  .add(Assert.truthy(1))
  .add(Assert.falsy(0))
  .add(Assert.null(null))
  .add(Assert.notNull(""))
  .add(Assert.arrayIsEmpty(altArray))
  .add(Assert.arrayIsNotEmpty(array))
  .add(Assert.objectIsEmpty(altObject))
  .add(Assert.objectIsNotEmpty(object))
  .add(Assert.equals(1, 1))
  .add(Assert.notEquals({b: {}}, {a: 1}));
    
test.result(true);
