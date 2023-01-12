const { Thread } = Melon.dotnet.threading;

fs.createDirectory("./out");

const files = [
    Array(400).fill("Something"),
    Array(400).fill("Something"),
    Array(400).fill("Something")
];

const t1 = new Thread(() => {
    files[0].forEach(item, index => {
        fs.writeText(`./out/0_${index}.txt`, item);
    })
});

const t2 = new Thread(() => {
    files[1].forEach(item, index => {
        fs.writeText(`./out/1_${index}.txt`, item);
    })
});

const t3 = new Thread(() => {
    files[2].forEach(item, index => {
        fs.writeText(`./out/2_${index}.txt`, item);
    })
});

t1.start();
t2.start();
t3.start();
t1.join();
t2.join();
t3.join();