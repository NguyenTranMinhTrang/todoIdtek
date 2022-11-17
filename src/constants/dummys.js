const TODO = [];


for (var i = 0; i < 1000; i++) {
    TODO.push({
        id: i,
        job: `Do homework ${i}`,
        date: `16/11/2022`,
        complete: false,
        priority: "pink"
    });
}

export default {
    TODO
}