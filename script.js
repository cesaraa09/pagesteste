let routines = [];

function toggleForm() {
  const form = document.getElementById("routine-form");
  form.classList.toggle("hidden");
}

function submitRoutine() {
  const time = document.getElementById("routine-time").value;
  const duration = document.getElementById("routine-duration").value;

  if (time && duration) {
    const routine = { time, duration, active: true };
    routines.push(routine);

    updateRoutineList();

    // Oculta o formulário após adicionar a rotina
    toggleForm();

    // Envia a rotina para o servidor
    fetch(`/addRoutine?time=${time}&duration=${duration}&active=true`)
      .then(response => {
        if (!response.ok) {
          alert("Erro ao adicionar a rotina.");
        }
      })
      .catch(error => {
        console.error("Erro:", error);
      });
  }
}

function updateRoutineList() {
  const routineList = document.getElementById("routine-list");
  routineList.innerHTML = ""; // Limpa a lista antes de atualizar

  routines.forEach((routine, index) => {
    const routineCard = document.createElement("div");
    routineCard.className = "routine-card";
    routineCard.innerHTML = `
      <strong>Rotina ${index + 1}</strong><br>
      ${routine.time}<br>
      ${routine.duration} seg
    `;

    const sliderContainer = document.createElement("div");
    sliderContainer.className = "slider";
    
    const slider = document.createElement("input");
    slider.type = "checkbox";
    slider.checked = routine.active;
    slider.addEventListener("change", () => {
      routine.active = slider.checked;
      fetch(`/toggleRoutine?index=${index}&active=${routine.active}`)
        .then(response => {
          if (!response.ok) {
            alert("Erro ao atualizar a rotina.");
          }
        })
        .catch(error => {
          console.error("Erro:", error);
        });
    });

    sliderContainer.appendChild(slider);
    routineCard.appendChild(sliderContainer);
    routineList.appendChild(routineCard);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const addButton = document.querySelector(".add-button");
  const parameterBox = document.querySelector(".parameter-box");
  const closeButton = document.querySelector(".close-button");

  // Mostra a caixa de parâmetros com animação
  addButton.addEventListener("click", () => {
    parameterBox.classList.add("show");
  });

  // Fecha a caixa de parâmetros ao clicar no botão "Fechar"
  closeButton.addEventListener("click", () => {
    parameterBox.classList.remove("show");
  });
});

