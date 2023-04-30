{
    let tasks = [
        // {
        //     content: "zrobić obiad",
        //     done: false,
        // },
        // {
        //     content: "przepisać notatki",
        //     done: false,
        // },
        // {
        //     content: "poćwiczyć na skrzypcach",
        //     done: true,
        // },
    ];

    let hideDoneTask = false;


    const addNewTask = (newTaskContent) => {
        tasks = [
            ...tasks,
            { content: newTaskContent },
        ];
        render();
    };

    const removeTask = (taskIndex) => {
        tasks = [
            ...tasks.slice(0, taskIndex),
            ...tasks.slice(taskIndex + 1),
        ];
        render();
    };

    const toggleTaskDone = (taskIndex) => {
        tasks = [
            ...tasks.slice(0, taskIndex),
            { ...tasks[taskIndex], done: !tasks[taskIndex].done },
            ...tasks.slice(taskIndex + 1),
        ];
        render();
    };


    const bindRemoveEvents = () => {
        const removeButtons = document.querySelectorAll(".js-remove");

        removeButtons.forEach((removeButton, taskIndex) => {
            removeButton.addEventListener("click", () => {
                removeTask(taskIndex);
            });
        });
    };


    const bindToggleDoneEvents = () => {
        const toggleDoneButtons = document.querySelectorAll(".js-toggleDone");

        toggleDoneButtons.forEach((toggleDoneButton, taskIndex) => {
            toggleDoneButton.addEventListener("click", () => {
                toggleTaskDone(taskIndex);
            });
        });
    };


    const bindButtonsEvents = () => {
        // Raz te przyciski są, a innym razem ich nie ma; gdy lista zadań jest pusta, przyciski się nie wyrenderują, więc:
        const button_toggleHideDoneTasks = document.querySelector(".js-toggleHideDoneTasks");

        if (button_toggleHideDoneTasks) {
            button_toggleHideDoneTasks.addEventListener("click", toggleHideDoneTasks);
        };

        const button_toggleAllTasksDone = document.querySelector(".js-toggleAllTasksDone");

        if (button_toggleAllTasksDone) {
            button_toggleAllTasksDone.addEventListener("click", toggleAllTasksDone);
        };
    };


    const renderTasks = () => {
        let HTMLString = "";

        for (const task of tasks) {
            HTMLString += `
        <li class="tasks__item js-task"> 
        <button class="tasks__button tasks__button--toggleDone js-toggleDone">
        ${task.done ? "✔" : ""}
        </button>
        <span class="tasks__content${task.done ? " tasks__content--done" : ""}">
        ${task.content}
        </span>
        <button class="tasks__button tasks__button--remove js-remove">✘</button>
        </li>
            `;
        };

        document.querySelector(".js-tasks").innerHTML = HTMLString;
    };


    const renderButtons = () => {
        let HTMLButtonString = "";

        if (tasks.length !== 0) {
            HTMLButtonString += `

        <button class="js-toggleHideDoneTasks buttons">
          ${tasks.some(({ done }) => done) ? "" : "disabled"}
          ${hideDoneTask ? "Pokaż" : "Ukryj"} ukończone
        </button>

        <button class="js-toggleAllTasksDone buttons">
          ${tasks.every(({ done }) => done) ? "disabled" : ""} Ukończ wszystkie
        </button>     
            `;
        };

        document.querySelector(".js-buttons").innerHTML = HTMLButtonString;
    };


    const render = () => {

        renderTasks();
        renderButtons();

        bindRemoveEvents();
        bindToggleDoneEvents();
        bindButtonsEvents();
    };


    const toggleHideDoneTasks = () => {
        hideDoneTask = !hideDoneTask;
        render();
    };

    const toggleAllTasksDone = () => {
        tasks = tasks.map((task) => (
            { ...task, done: true }
        ));
    };


    const onFormSubmit = (event) => {
        event.preventDefault();

        const newTaskElement = document.querySelector(".js-newTask");
        const newTaskContent = newTaskElement.value.trim();

        if (newTaskContent !== "") {
            addNewTask(newTaskContent);
            newTaskElement.value = "";
        }

        newTaskElement.focus();
    };


    const init = () => {
        render();

        const form = document.querySelector(".js-form");

        form.addEventListener("submit", onFormSubmit);
    };

    init();
}