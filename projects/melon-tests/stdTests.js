const { test } = Melon.testing;
const { json } = Melon.std;

test("Melon.std.json.deserialize should deserialize JSON value correctly", assert => {
    const string = "{\"a\": 1}";
    const deserialized = json.deserialize(string);

    assert.equals(1, deserialized.a);
    assert.equals(Object.keys(deserialized).length, 1);
})

test("Melon.std.json.serialize should serialize an object correctly", assert => {
    const object = {a: 1};
    const serialized = json.serialize(object);

    assert.equals(1, json.deserialize(serialized).a);
})

test("Melon.std.json.tryParse should parse JSON value correctly", assert => {
    const string = "{\"a\": 1}";
    const parsed = json.tryParse(string);

    assert.equals(1, parsed.a);
})

test("Melon.std.json.tryStringify should stringify an object correctly", assert => {
    const object = {a: 1};
    const stringified = json.tryStringify(object);

    assert.equals(1, json.tryParse(stringified).a);
})