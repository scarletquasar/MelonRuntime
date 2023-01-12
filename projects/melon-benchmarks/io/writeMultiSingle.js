const { Thread } = Melon.dotnet.threading;

function chunk(arr, len) {
    const chunks = [];
    let i = 0;
    const n = arr.length;
  
    while (i < n) {
        chunks.push(arr.slice(i, i += len));
    }
  
    return chunks;
}

fs.createDirectory("./out");

const files = Array(1200).fill("Something");

files.forEach((item, index) => {
    fs.writeText(`./out/${index}.txt`, item);
});
