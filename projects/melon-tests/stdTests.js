const { test } = Melon.testing;
const { json, system } = Melon.std;

const runStdTests = () => {
    test("Melon.std.environment.baseDirectory should not be null or empty", assert => {
        assert.truthy(Melon.std.environment.baseDirectory);
    }) 
    
    test("Melon.std.system.osInformation should have the correct value", assert => {
        const realOsInformation = Melon.dotnet.getStaticProperty("System:Environment:OSVersion");
        const osInformation = system.osInformation;
    
        assert.equals(realOsInformation.Platform, osInformation.platform);
        assert.equals(realOsInformation.VersionString, osInformation.versionString);
        assert.equals(realOsInformation.ServicePack, osInformation.servicePack);
    })
    
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
}

runStdTests();
export { runStdTests }