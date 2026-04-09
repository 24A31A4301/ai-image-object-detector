const imageUpload = document.getElementById("imageUpload");
const image = document.getElementById("image");
const result = document.getElementById("result");

let model;

// Load AI model
async function loadModel() {
  model = await cocoSsd.load();
  console.log("Model Loaded ✅");
}

loadModel();

// Handle image upload
imageUpload.addEventListener("change", function () {
  const file = this.files[0];

  if (!file) return;

  const reader = new FileReader();

  reader.onload = function (e) {
    image.src = e.target.result;
    result.innerHTML = "⏳ Detecting objects...";
  };

  reader.readAsDataURL(file);
});

// Run detection AFTER image fully loads
image.addEventListener("load", async function () {

  if (!model) {
    result.innerHTML = "⚠️ Model is still loading... please wait";
    return;
  }

  const predictions = await model.detect(image);

  if (predictions.length > 0) {
    let output = "";

    predictions.forEach(pred => {
      output += `${pred.class} (${Math.round(pred.score * 100)}%) <br>`;
    });

    result.innerHTML = output;

  } else {
    result.innerHTML = "⚠️ No known objects detected (Try real-world image)";
  }

});
