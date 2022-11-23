const TODO = [];

const colors = ["pink", "orange", "bubble", "blue", "green"];


for (var i = 0; i < 1000; i++) {
    TODO.push({
        id: i,
        job: `Do homework ${i}`,
        date: new Date(),
        complete: false,
        priority: "pink",
        todoDetails: [],
    });
}

export default {
    TODO,
    colors
}