const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");

const source = fs.readFileSync(new URL("../impactco2-equivalents.js", `file://${__filename}`), "utf8");

async function successCase() {
  const datasets = {
    alimentation: [{ slug: "repasavecduboeuf", ecv: 5.1 }],
    numerique: [
      { slug: "ordinateurportable", ecv: 193, footprint: 183, usage: { peryear: 1.56 } },
      { slug: "smartphone", ecv: 81, footprint: 80, usage: { peryear: 0.26 } }
    ],
    transport: [
      { slug: "voiturethermique", ecv: 0.15 },
      { slug: "avion-moyencourrier", ecv: 0.19 },
      { slug: "avion-longcourrier", ecv: 0.18 }
    ]
  };
  const requested = [];
  const context = {
    Promise,
    Error,
    Array,
    Number,
    CO2kmvoiture: 0,
    CO2kmavion: 0,
    impactCO2EquipmentDevices: { laptop: {}, smartphone: {} },
    fetch(url, options) {
      requested.push({ url, options });
      const category = Object.keys(datasets).find((key) => url.includes(`/ecv/${key}`));
      return Promise.resolve({ ok: true, json: () => Promise.resolve({ data: datasets[category] }) });
    }
  };
  context.window = context;
  vm.runInNewContext(source, context);
  const factors = await context.impactCO2Ready;

  assert.equal(requested.length, 3);
  assert.ok(requested.every(({ options }) => options.credentials === "omit"));
  assert.ok(requested.some(({ url }) => url.includes("/ecv/numerique") && url.includes("detail=1")));
  assert.equal(factors.mealBeef, 5.1);
  assert.equal(factors.laptop, 193);
  assert.equal(factors.smartphone, 81);
  assert.equal(factors.car, 0.15);
  assert.equal(factors.planeMedium, 0.19);
  assert.equal(factors.planeLong, 0.18);
  assert.equal(context.CO2kmvoiture, 0.15);
  assert.equal(context.CO2kmavion, 0.19);
  assert.equal(context.impactCO2EquipmentDevices.laptop.production, 183);
  assert.ok(Math.abs(context.impactCO2EquipmentDevices.laptop.usage - 30) < 1e-9);
  assert.equal(context.impactCO2EquipmentDevices.smartphone.production, 80);
  assert.ok(Math.abs(context.impactCO2EquipmentDevices.smartphone.usage - 5) < 1e-9);
}

async function fallbackCase() {
  const context = {
    Promise,
    Error,
    Array,
    Number,
    fetch: () => Promise.reject(new Error("offline"))
  };
  context.window = context;
  vm.runInNewContext(source, context);
  const factors = await context.impactCO2Ready;

  assert.equal(factors.mealBeef, 4.97);
  assert.equal(factors.car, 0.14225341222954335);
  assert.equal(factors.planeMedium, 0.184661);
  assert.equal(factors.planeLong, 0.177894);
  assert.equal(factors.laptop, 192.62004125);
  assert.equal(factors.smartphone, 80.155343125);
}

Promise.all([successCase(), fallbackCase()])
  .then(() => console.log("OK : API Impact CO₂ et repli local contrôlés"))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
