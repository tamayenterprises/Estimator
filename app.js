const form = document.getElementById("estimatorForm");
const projectType = document.getElementById("projectType");

const drywallSection = document.getElementById("drywallSection");
const lightingSection = document.getElementById("lightingSection");
const paintSection = document.getElementById("paintSection");

const steps = document.querySelectorAll(".step");
const results = document.getElementById("results");

const toStep2 = document.getElementById("toStep2");
const toStep3 = document.getElementById("toStep3");
const backTo1 = document.getElementById("backTo1");
const backTo2 = document.getElementById("backTo2");
const restartBtn = document.getElementById("restart");

const damageSize = document.getElementById("damageSize");
const fixtureCount = document.getElementById("fixtureCount");
const roomSize = document.getElementById("roomSize");

const nameInput = document.getElementById("name");
const phoneInput = document.getElementById("phone");
const emailInput = document.getElementById("email");

const materialsOutput = document.getElementById("materials");
const laborOutput = document.getElementById("labor");
const totalOutput = document.getElementById("total");

let currentStep = 1;

const PRICING = {
  drywall: {
    small: {
      label: "Small drywall repair",
      materialMin: 18,
      materialMax: 35,
      hours: 1.5
    },
    medium: {
      label: "Medium drywall repair",
      materialMin: 35,
      materialMax: 70,
      hours: 2.5
    },
    large: {
      label: "Large drywall repair",
      materialMin: 70,
      materialMax: 125,
      hours: 4
    }
  },

  lighting: {
    "1": {
      label: "1 light fixture",
      materialMin: 45,
      materialMax: 110,
      hours: 3.5
    },
    "2": {
      label: "2 light fixtures",
      materialMin: 85,
      materialMax: 210,
      hours: 6.2
    },
    "3": {
      label: "3 light fixtures",
      materialMin: 125,
      materialMax: 310,
      hours: 8.8
    }
  },

  paint: {
    small: {
      label: "Small room",
      materialMin: 160,
      materialMax: 280,
      laborMin: 360,
      laborMax: 470
    },
    medium: {
      label: "Medium room",
      materialMin: 180,
      materialMax: 320,
      laborMin: 520,
      laborMax: 630
    },
    large: {
      label: "Large room",
      materialMin: 260,
      materialMax: 450,
      laborMin: 650,
      laborMax: 820
    }
  }
};

const LABOR = {
  generalCrewHourly: 32 * 2,
  electricalCrewHourly: 45 * 2
};

function currency(value) {
  return `$${Math.round(value).toLocaleString("en-US")}`;
}

function showStep(stepNumber) {
  currentStep = stepNumber;

  steps.forEach((step) => {
    const stepValue = Number(step.dataset.step);
    step.classList.toggle("active", stepValue === stepNumber);
  });

  if (stepNumber !== 4) {
    results.classList.add("hidden");
  }

  window.scrollTo({ top: 0, behavior: "smooth" });
}

function updateProjectSections() {
  const type = projectType.value;

  drywallSection.classList.toggle("hidden", type !== "drywall");
  lightingSection.classList.toggle("hidden", type !== "lighting");
  paintSection.classList.toggle("hidden", type !== "paint");
}

function validateStep1() {
  return !!projectType.value;
}

function validateStep2() {
  const type = projectType.value;

  if (type === "drywall") return !!damageSize.value;
  if (type === "lighting") return !!fixtureCount.value;
  if (type === "paint") return !!roomSize.value;

  return false;
}

function validateStep3() {
  const name = nameInput.value.trim();
  const phone = phoneInput.value.trim();
  const email = emailInput.value.trim();

  return name && phone && email;
}

function calculateDrywallEstimate() {
  const selected = PRICING.drywall[damageSize.value];
  const laborMin = selected.hours * LABOR.generalCrewHourly;
  const laborMax = laborMin * 1.15;

  return {
    materials: `${currency(selected.materialMin)} - ${currency(selected.materialMax)}`,
    labor: `${currency(laborMin)} - ${currency(laborMax)}`,
    total: `${currency(selected.materialMin + laborMin)} - ${currency(selected.materialMax + laborMax)}`
  };
}

function calculateLightingEstimate() {
  const selected = PRICING.lighting[fixtureCount.value];
  const laborMin = selected.hours * LABOR.electricalCrewHourly;
  const laborMax = laborMin * 1.15;

  return {
    materials: `${currency(selected.materialMin)} - ${currency(selected.materialMax)}`,
    labor: `${currency(laborMin)} - ${currency(laborMax)}`,
    total: `${currency(selected.materialMin + laborMin)} - ${currency(selected.materialMax + laborMax)}`
  };
}

function calculatePaintEstimate() {
  const selected = PRICING.paint[roomSize.value];
  const totalMin = selected.materialMin + selected.laborMin;
  const totalMax = selected.materialMax + selected.laborMax;

  return {
    materials: `${currency(selected.materialMin)} - ${currency(selected.materialMax)}`,
    labor: `${currency(selected.laborMin)} - ${currency(selected.laborMax)}`,
    total: `${currency(totalMin)} - ${currency(totalMax)}`
  };
}

function renderResults(data) {
  materialsOutput.textContent = `Materials: ${data.materials}`;
  laborOutput.textContent = `Labor: ${data.labor}`;
  totalOutput.textContent = `Total: ${data.total}`;

  form.classList.add("hidden");
  results.classList.remove("hidden");

  window.scrollTo({ top: 0, behavior: "smooth" });
}

function resetEstimator() {
  form.reset();
  form.classList.remove("hidden");
  results.classList.add("hidden");
  updateProjectSections();
  showStep(1);
}

toStep2.addEventListener("click", () => {
  if (!validateStep1()) {
    alert("Please select a project type.");
    return;
  }

  updateProjectSections();
  showStep(2);
});

toStep3.addEventListener("click", () => {
  if (!validateStep2()) {
    alert("Please complete the project basics.");
    return;
  }

  showStep(3);
});

backTo1.addEventListener("click", () => {
  showStep(1);
});

backTo2.addEventListener("click", () => {
  showStep(2);
});

projectType.addEventListener("change", updateProjectSections);

form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (!validateStep3()) {
    alert("Please complete your name, phone, and email.");
    return;
  }

  let estimate;

  if (projectType.value === "drywall") {
    estimate = calculateDrywallEstimate();
  } else if (projectType.value === "lighting") {
    estimate = calculateLightingEstimate();
  } else {
    estimate = calculatePaintEstimate();
  }

  renderResults(estimate);
});

restartBtn.addEventListener("click", resetEstimator);

updateProjectSections();
showStep(1);
