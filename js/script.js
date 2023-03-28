{
    const tasks = [
        {
            content: "zrobić obiad",
            done: false,
        },
        {
            content: "przepisać notatki",
            done: false,
        },
        {
            content: "pograć na skrzypcach",
            done: true,
        },
    ];

    const render = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
            <li${task.done ? " style=\"text-decoration: line-through\"" : ""}>
            ${task.content}
            </li >
        `;
        }

        document.querySelector(".js-tasks").innerHTML = htmlString;
    };

    const init = () => {
        render();

        const form = document.querySelector(".js-form");

        form.addEventListener("submit", (event) => {
            event.preventDefault();

            const newTaskContent = document.querySelector(".js-newTask").value.trim();

            if(newTaskContent === "") {
            return;
            }

            tasks.push({
                content: newTaskContent,
            });

            render();
        });

    };

    init();
}