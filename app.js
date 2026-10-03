document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       GET ELEMENTS
    ===================================================== */

    const bmiForm = document.getElementById("bmiForm");

    const ageInput = document.getElementById("age");
    const genderInput = document.getElementById("gender");
    const activityInput = document.getElementById("activity");

    const heightUnit = document.getElementById("heightUnit");
    const heightCm = document.getElementById("heightCm");
    const heightFeet = document.getElementById("heightFeet");
    const heightInches = document.getElementById("heightInches");
    const feetHeightInputs =
        document.getElementById("feetHeightInputs");

    const weightInput = document.getElementById("weight");

    const weightUnit = document.getElementById("weightUnit");

    const bmiValue = document.getElementById("bmiValue");
    const bmiCategory = document.getElementById("bmiCategory");
    const bmiMessage = document.getElementById("bmiMessage");
    const recommendedGoal =
        document.getElementById("recommendedGoal");

    const bmiMarker =
        document.getElementById("bmiMarker");

    const bmiResult =
        document.getElementById("bmiResult");

    const bmiStatusIcon =
        document.getElementById("bmiStatusIcon");


    /* =====================================================
       MODULE 2 ELEMENTS
    ===================================================== */

    const dailyCalories =
        document.getElementById("dailyCalories");

    const calorieGoal =
        document.getElementById("calorieGoal");

    const calorieDescription =
        document.getElementById("calorieDescription");

    const bmrValue =
        document.getElementById("bmrValue");

    const tdeeValue =
        document.getElementById("tdeeValue");

    const targetCalories =
        document.getElementById("targetCalories");


    /* =====================================================
       HEIGHT UNIT CHANGE
    ===================================================== */

    

    if (heightUnit) {
        heightUnit.addEventListener("change", function () {

            if (heightUnit.value === "cm") {

                if (heightCm) {
                    heightCm.style.display = "block";
                    heightCm.required = true;
                }

                if (feetHeightInputs) {
                    feetHeightInputs.classList.add("hidden");
                }

                if (heightFeet) heightFeet.required = false;
                if (heightInches) heightInches.required = false;

            } else {

                if (heightCm) {
                    heightCm.style.display = "none";
                    heightCm.required = false;
                }

                if (feetHeightInputs) {
                    feetHeightInputs.classList.remove("hidden");
                }

                if (heightFeet) heightFeet.required = true;
                if (heightInches) heightInches.required = true;
            }
        });
    }

    // Set the correct initial height mode without submitting the form.
    if (heightUnit) {
        heightUnit.dispatchEvent(new Event("change"));
    }

    /* =====================================================
       WEIGHT UNIT CHANGE
    ===================================================== */

    if (weightUnit && weightInput) {
        let previousWeightUnit = weightUnit.value;
        weightUnit.addEventListener("change", function () {
            const currentWeight = Number(weightInput.value);
            if (currentWeight > 0 && previousWeightUnit !== weightUnit.value) {
                weightInput.value = (weightUnit.value === "lb"
                    ? currentWeight / 0.45359237
                    : currentWeight * 0.45359237).toFixed(1);
            }
            previousWeightUnit = weightUnit.value;
            if (weightUnit.value === "lb") {
                weightInput.placeholder = "Enter weight in pounds";
            } else {
                weightInput.placeholder = "Enter weight in kg";
            }
        });
    }


    /* =====================================================
       BMI FORM
    ===================================================== */

    if (bmiForm) {
    bmiForm.addEventListener("submit", function (event) {

        event.preventDefault();


        /* ================= AGE ================= */

        const age = Number(ageInput.value);

        if (!age || age < 10 || age > 100) {

            alert(
                "Please enter a valid age between 10 and 100."
            );

            return;
        }


        /* ================= GENDER ================= */

        const gender = genderInput.value;

        if (!gender) {

            alert("Please select your gender.");

            return;
        }


        /* ================= HEIGHT ================= */

       let heightInCm;

if (heightUnit && heightUnit.value === "cm") {

    if (!heightCm) {
        alert("Height input was not found.");
        return;
    }

    heightInCm = Number(heightCm.value);

} else {

    if (!heightFeet || !heightInches) {
        alert("Feet and inches inputs were not found.");
        return;
    }

    const feet = Number(heightFeet.value);
    const inches = Number(heightInches.value);
            if (!feet || feet < 1 || feet > 8) {

                alert("Please enter valid feet.");

                return;
            }


            if (inches < 0 || inches > 11) {

                alert(
                    "Inches must be between 0 and 11."
                );

                return;
            }


            heightInCm =
                ((feet * 12) + inches) * 2.54;
        }


        if (
            !heightInCm ||
            heightInCm < 50 ||
            heightInCm > 250
        ) {

            alert(
                "Please enter a valid height between 50 cm and 250 cm."
            );

            return;
        }


        /* ================= WEIGHT ================= */

        if (!weightInput) {
            alert("Weight input was not found.");
            return;
        }

        let weightInKg = Number(weightInput.value);


        if (!weightInKg || weightInKg <= 0) {

            alert("Please enter a valid weight.");

            return;
        }


        if (weightUnit && weightUnit.value === "lb") {

            weightInKg =
                weightInKg * 0.45359237;
        }


        /* ================= BMI ================= */

        const heightInMeters =
            heightInCm / 100;


        const bmi =
            weightInKg /
            (heightInMeters * heightInMeters);


        const finalBMI =
            bmi.toFixed(1);


        /* =====================================================
           BMI CATEGORY
        ===================================================== */

        let category;
        let message;
        let goal;
        let markerPosition;
        let statusIcon;


        if (bmi < 18.5) {

            category = "Underweight";

            message =
                "Your BMI is below the healthy range. A balanced nutrition plan may help you gradually gain weight.";

            goal = "Gain Weight";

            markerPosition = 12;

            statusIcon = "🥗";


        } else if (bmi < 25) {

            category = "Healthy Weight";

            message =
                "Great! Your BMI is within the healthy range. Focus on balanced nutrition and regular physical activity.";

            goal = "Maintain Weight";

            markerPosition = 40;

            statusIcon = "❤️";


        } else if (bmi < 30) {

            category = "Overweight";

            message =
                "Your BMI is above the healthy range. A balanced diet and regular exercise can help you work toward a healthier weight.";

            goal = "Lose Weight";

            markerPosition = 65;

            statusIcon = "⚠️";


        } else {

            category = "Obesity";

            message =
                "Your BMI is in the obesity range. Healthy lifestyle changes and professional guidance can be helpful.";

            goal = "Lose Weight";

            markerPosition = 88;

            statusIcon = "🩺";
        }


        /* =====================================================
           DISPLAY BMI RESULT
        ===================================================== */

        bmiValue.textContent =
            finalBMI;

        bmiCategory.textContent =
            category;

        bmiMessage.textContent =
            message;

        recommendedGoal.textContent =
            goal;


        bmiMarker.style.left =
            markerPosition + "%";


        bmiStatusIcon.textContent =
            statusIcon;

        bmiStatusIcon.classList.remove("active");

        void bmiStatusIcon.offsetWidth;

        bmiStatusIcon.classList.add("active");


        bmiResult.classList.remove(
            "show-result"
        );

        void bmiResult.offsetWidth;

        bmiResult.classList.add(
            "show-result"
        );


        /* =====================================================
           MODULE 2
           CALORIE CALCULATION
        ===================================================== */

        const calorieTarget = calculateCalories(
            age,
            gender,
            heightInCm,
            weightInKg,
            activityInput ? activityInput.value : "sedentary",
            bmi,
            goal
        );


        /* =====================================================
           SAVE DATA
        ===================================================== */

        const healthData = {

            age: age,

            gender: gender,

            activity: activityInput ? activityInput.value : "sedentary",

            heightCm:
                Number(heightInCm.toFixed(2)),

            weightKg:
                Number(weightInKg.toFixed(2)),

            bmi:
                Number(finalBMI),

            category:
                category,

            goal:
                goal,

            targetCalories:
                Number(calorieTarget) || 0
        };


        localStorage.setItem(
            "healthConnectBMI",
            JSON.stringify(healthData)
        );


        console.log(
            "HealthConnect data saved:",
            healthData
        );

    });
    }


    /* =====================================================
       MODULE 2 CALORIE FUNCTION
    ===================================================== */

    function calculateCalories(
        age,
        gender,
        height,
        weight,
        activity,
        bmi,
        goal
    ) {

        let bmr;


        /* ================= BMR =================
           Mifflin-St Jeor Equation
        ========================================== */

        if (gender === "male") {

            bmr =
                (10 * weight) +
                (6.25 * height) -
                (5 * age) +
                5;

        } else if (gender === "female") {

            bmr =
                (10 * weight) +
                (6.25 * height) -
                (5 * age) -
                161;

        } else {

            /* Average for "Other" */

            const maleBMR =
                (10 * weight) +
                (6.25 * height) -
                (5 * age) +
                5;

            const femaleBMR =
                (10 * weight) +
                (6.25 * height) -
                (5 * age) -
                161;

            bmr =
                (maleBMR + femaleBMR) / 2;
        }


        /* =====================================================
           ACTIVITY MULTIPLIER
        ===================================================== */

        let activityMultiplier;


        switch (activity) {

            case "sedentary":

                activityMultiplier = 1.2;

                break;


            case "light":

                activityMultiplier = 1.375;

                break;


            case "moderate":

                activityMultiplier = 1.55;

                break;


            case "active":

                activityMultiplier = 1.725;

                break;


            default:

                activityMultiplier = 1.2;
        }


        /* =====================================================
           TDEE
        ===================================================== */

        const tdee =
            bmr * activityMultiplier;


        /* =====================================================
           TARGET CALORIES
        ===================================================== */

        let target;


        if (goal === "Gain Weight") {

            target =
                tdee + 300;

        } else if (goal === "Lose Weight") {

            target =
                tdee - 300;

        } else {

            target =
                tdee;
        }


        /* Prevent unrealistically low target */

        if (gender === "female" && target < 1200) {

            target = 1200;

        }

        if (gender !== "female" && target < 1400) {

            target = 1400;

        }


        /* =====================================================
           ROUND VALUES
        ===================================================== */

        const roundedBMR =
            Math.round(bmr);

        const roundedTDEE =
            Math.round(tdee);

        const roundedTarget =
            Math.round(target);


        /* =====================================================
           SHOW MODULE 2 RESULT
        ===================================================== */

        if (bmrValue) bmrValue.textContent =
            roundedBMR;

        if (tdeeValue) tdeeValue.textContent =
            roundedTDEE;

        if (targetCalories) targetCalories.textContent =
            roundedTarget;

        if (dailyCalories) dailyCalories.textContent =
            roundedTarget;

        if (calorieGoal) calorieGoal.textContent =
            goal;


        /* =====================================================
           DESCRIPTION
        ===================================================== */

        if (goal === "Gain Weight") {

            if (calorieDescription) calorieDescription.textContent =
                "Your estimated daily needs are increased slightly to support gradual weight gain.";

        } else if (goal === "Lose Weight") {

            if (calorieDescription) calorieDescription.textContent =
                "Your target is set slightly below your estimated daily needs to support gradual weight loss.";

        } else {

            if (calorieDescription) calorieDescription.textContent =
                "Your target is based on your estimated daily energy needs for maintaining your current weight.";
        }


        console.log(
            "Calorie calculation:",
            {
                BMR: roundedBMR,
                TDEE: roundedTDEE,
                Target: roundedTarget,
                Goal: goal
            }
        );

        return roundedTarget;
    }


    /* =====================================================
       LOAD SAVED BMI DATA
    ===================================================== */

    const savedData =
        localStorage.getItem(
            "healthConnectBMI"
        );


    if (savedData) {

        try {

            const data =
                JSON.parse(savedData);


            if (data.bmi) {

                bmiValue.textContent =
                    data.bmi;

                bmiCategory.textContent =
                    data.category;

                recommendedGoal.textContent =
                    data.goal;


                /* BMI marker */

                if (data.bmi < 18.5) {

                    bmiMarker.style.left =
                        "12%";

                    bmiMessage.textContent =
                        "Your saved BMI is below the healthy range.";

                } else if (data.bmi < 25) {

                    bmiMarker.style.left =
                        "40%";

                    bmiMessage.textContent =
                        "Your saved BMI is within the healthy range.";

                } else if (data.bmi < 30) {

                    bmiMarker.style.left =
                        "65%";

                    bmiMessage.textContent =
                        "Your saved BMI is above the healthy range.";

                } else {

                    bmiMarker.style.left =
                        "88%";

                    bmiMessage.textContent =
                        "Your saved BMI is in the obesity range.";
                }


                /* =================================================
                   LOAD MODULE 2
                ================================================= */

                if (
                    data.age &&
                    data.heightCm &&
                    data.weightKg
                ) {

                    calculateCalories(

                        data.age,

                        data.gender,

                        data.heightCm,

                        data.weightKg,

                        data.activity || "sedentary",

                        data.bmi,

                        data.goal
                    );
                }
            }


        } catch (error) {

            console.log(
                "Could not load saved BMI data."
            );
        }
    }


    /* =====================================================
       SMOOTH SCROLLING
    ===================================================== */

    document
        .querySelectorAll(
            'a[href^="#"]'
        )
        .forEach(function (link) {

            link.addEventListener(
                "click",
                function (event) {

                    const targetId =
                        this.getAttribute("href");


                    if (
                        targetId === "#" ||
                        !targetId
                    ) {

                        return;
                    }


                    const target =
                        document.querySelector(
                            targetId
                        );


                    if (target) {

                        event.preventDefault();


                        target.scrollIntoView({

                            behavior: "smooth"

                        });

                    }

                }
            );

        });

});
/* =====================================================
   HEALTHCONNECT - MODULE 3
   7-DAY DIET PLANNER
===================================================== */

(function () {

    /* ================= FOOD DATABASE ================= */

    const foodDatabase = window.foodDatabase =  {

    /* =====================================================
       VEGETARIAN FOODS
    ===================================================== */

    vegetarian: [
            {
    name: "Masala Dosa",
    calories: 280,
    protein: 6,
    fat: 10,
    carbs: 40,
    image: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=500"
},

{
    name: "Besan Chilla - 2",
    calories: 240,
    protein: 12,
    fat: 8,
    carbs: 30,
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=500"
},

{
    name: "Palak Paneer",
    calories: 300,
    protein: 16,
    fat: 20,
    carbs: 12,
    image: "https://images.unsplash.com/photo-1601050690117-94f5f6fa8bd7?w=500"
},

{
    name: "Vegetable Khichdi",
    calories: 250,
    protein: 9,
    fat: 6,
    carbs: 40,
    image: "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=500"
},

{
    name: "Aloo Gobi",
    calories: 180,
    protein: 5,
    fat: 7,
    carbs: 25,
    image: "https://images.unsplash.com/photo-1601050690117-94f5f6fa8bd7?w=500"
},

{
    name: "Bhindi Masala",
    calories: 170,
    protein: 4,
    fat: 8,
    carbs: 22,
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=500"
},

{
    name: "Tofu Salad",
    calories: 220,
    protein: 16,
    fat: 12,
    carbs: 12,
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500"
},

{
    name: "Fruit Salad",
    calories: 150,
    protein: 2,
    fat: 1,
    carbs: 35,
    image: "https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?w=500"
},

{
    name: "Greek Yogurt with Fruit",
    calories: 180,
    protein: 12,
    fat: 5,
    carbs: 22,
    image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=500"
},

{
    name: "Peanut Chaat",
    calories: 220,
    protein: 9,
    fat: 14,
    carbs: 16,
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500"
},
        {
            name: "Oats with Milk",
            calories: 250,
            protein: 10,
            fat: 8,
            carbs: 35,
            image: "https://images.unsplash.com/photo-1517673132405-a56a62b18caf?w=500"
        },

        {
            name: "Vegetable Poha",
            calories: 220,
            protein: 5,
            fat: 7,
            carbs: 34,
            image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=500"
        },

        {
            name: "Idli - 2 Pieces",
            calories: 140,
            protein: 4,
            fat: 1,
            carbs: 28,
            image: "https://images.unsplash.com/photo-1630383249896-424e482df921?w=500"
        },

        {
            name: "Paneer Bhurji",
            calories: 280,
            protein: 16,
            fat: 20,
            carbs: 8,
            image: "https://images.unsplash.com/photo-1601050690117-94f5f6fa8bd7?w=500"
        },

        {
            name: "Paneer Tikka",
            calories: 280,
            protein: 18,
            fat: 19,
            carbs: 10,
            image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=500"
        },

        {
            name: "Dal - 1 Bowl",
            calories: 180,
            protein: 10,
            fat: 5,
            carbs: 24,
            image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=500"
        },

        {
            name: "Dal Tadka",
            calories: 220,
            protein: 10,
            fat: 8,
            carbs: 28,
            image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=500"
        },

        {
            name: "Multigrain Roti - 2",
            calories: 200,
            protein: 7,
            fat: 3,
            carbs: 38,
            image: "https://images.unsplash.com/photo-1628294895950-9805252327bc?w=500"
        },

        {
            name: "Vegetable Pulao",
            calories: 280,
            protein: 6,
            fat: 8,
            carbs: 45,
            image: "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=500"
        },

        {
            name: "Rajma Chawal",
            calories: 420,
            protein: 14,
            fat: 9,
            carbs: 68,
            image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=500"
        },

        {
            name: "Chole",
            calories: 270,
            protein: 12,
            fat: 8,
            carbs: 38,
            image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=500"
        },

        {
            name: "Vegetable Upma",
            calories: 230,
            protein: 6,
            fat: 7,
            carbs: 35,
            image: "https://images.unsplash.com/photo-1601050690117-94f5f6fa8bd7?w=500"
        },

        {
            name: "Vegetable Dalia",
            calories: 210,
            protein: 7,
            fat: 4,
            carbs: 35,
            image: "https://images.unsplash.com/photo-1547592180-85f173990554?w=500"
        },

        {
            name: "Curd - 1 Bowl",
            calories: 100,
            protein: 5,
            fat: 4,
            carbs: 8,
            image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=500"
        },

        {
            name: "Sprouts Salad",
            calories: 150,
            protein: 9,
            fat: 3,
            carbs: 22,
            image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500"
        },

        {
            name: "Mixed Vegetable Salad",
            calories: 120,
            protein: 4,
            fat: 3,
            carbs: 18,
            image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500"
        },

        {
            name: "Fruit Salad",
            calories: 130,
            protein: 2,
            fat: 1,
            carbs: 32,
            image: "https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?w=500"
        },

        {
            name: "Roasted Chana",
            calories: 160,
            protein: 8,
            fat: 3,
            carbs: 25,
            image: "https://images.unsplash.com/photo-1599909533603-9f4f5e4f4c6f?w=500"
        },

        {
            name: "Peanut Chaat",
            calories: 180,
            protein: 8,
            fat: 12,
            carbs: 10,
            image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500"
        },

        {
            name: "Apple",
            calories: 95,
            protein: 0.5,
            fat: 0.3,
            carbs: 25,
            image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=500"
        },

        {
            name: "Banana",
            calories: 105,
            protein: 1.3,
            fat: 0.4,
            carbs: 27,
            image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=500"
        },

        {
            name: "Orange",
            calories: 62,
            protein: 1.2,
            fat: 0.2,
            carbs: 15,
            image: "https://images.unsplash.com/photo-1547514701-42782101795e?w=500"
        },

        {
            name: "Guava",
            calories: 68,
            protein: 2.6,
            fat: 1,
            carbs: 14,
            image: "https://images.unsplash.com/photo-1536511132770-e5058c7e8c46?w=500"
        },

        {
            name: "Besan Chilla - 2",
            calories: 240,
            protein: 12,
            fat: 8,
            carbs: 30,
            image: "https://images.unsplash.com/photo-1601050690117-94f5f6fa8bd7?w=500"
        },
        {
            name: "Vegetable Dalia",
            calories: 210,
            protein: 7,
            fat: 5,
            carbs: 34,
            image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=500"
        },
        {
            name: "Masala Oats",
            calories: 230,
            protein: 9,
            fat: 7,
            carbs: 32,
            image: "https://images.unsplash.com/photo-1517673132405-a56a62b18caf?w=500"
        },
        {
            name: "Moong Dal Chilla - 2",
            calories: 220,
            protein: 13,
            fat: 5,
            carbs: 30,
            image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=500"
        },
        {
            name: "Vegetable Khichdi",
            calories: 260,
            protein: 9,
            fat: 6,
            carbs: 42,
            image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=500"
        },
        {
            name: "Palak Paneer - 1 Bowl",
            calories: 290,
            protein: 15,
            fat: 20,
            carbs: 12,
            image: "https://images.unsplash.com/photo-1601050690117-94f5f6fa8bd7?w=500"
        },
        {
            name: "Peanut Chaat",
            calories: 220,
            protein: 10,
            fat: 14,
            carbs: 14,
            image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=500"
        },
        {
            name: "Guava",
            calories: 68,
            protein: 2.6,
            fat: 1,
            carbs: 14,
            image: "https://images.unsplash.com/photo-1536511132770-e5058c7e8c46?w=500"
        },
        {
            name: "Papaya - 1 Bowl",
            calories: 60,
            protein: 1,
            fat: 0.4,
            carbs: 15,
            image: "https://images.unsplash.com/photo-1526318472351-c75fcf070305?w=500"
        },
    ],


    /* =====================================================
       NON-VEGETARIAN FOODS
    ===================================================== */

    nonvegetarian: [
        {
    name: "Grilled Chicken Breast",
    calories: 280,
    protein: 42,
    fat: 10,
    carbs: 0,
    image: "https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=500"
},

{
    name: "Chicken Biryani",
    calories: 450,
    protein: 25,
    fat: 16,
    carbs: 52,
    image: "https://images.unsplash.com/photo-1563379091339-03246963d51a?w=500"
},

{
    name: "Chicken Curry",
    calories: 320,
    protein: 30,
    fat: 18,
    carbs: 8,
    image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=500"
},

{
    name: "Egg Curry",
    calories: 260,
    protein: 16,
    fat: 18,
    carbs: 8,
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=500"
},

{
    name: "Grilled Fish",
    calories: 220,
    protein: 30,
    fat: 9,
    carbs: 0,
    image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=500"
},

{
    name: "Fish Curry",
    calories: 280,
    protein: 28,
    fat: 15,
    carbs: 7,
    image: "https://images.unsplash.com/photo-1534766555764-ce878a5e3a2b?w=500"
},

{
    name: "Chicken Salad",
    calories: 300,
    protein: 35,
    fat: 12,
    carbs: 12,
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500"
},

{
    name: "Chicken Sandwich",
    calories: 350,
    protein: 25,
    fat: 14,
    carbs: 32,
    image: "https://images.unsplash.com/photo-1521390188846-e2a3a97453a0?w=500"
},
        {
            name: "Boiled Eggs - 2",
            calories: 140,
            protein: 12,
            fat: 10,
            carbs: 1,
            image: "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=500"
        },

        {
            name: "Egg Omelette",
            calories: 180,
            protein: 13,
            fat: 13,
            carbs: 2,
            image: "https://images.unsplash.com/photo-1510693206972-df098f0cbf06?w=500"
        },

        {
            name: "Boiled Egg - 1",
            calories: 70,
            protein: 6,
            fat: 5,
            carbs: 0.5,
            image: "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=500"
        },

        {
            name: "Chicken Tikka",
            calories: 250,
            protein: 30,
            fat: 12,
            carbs: 5,
            image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=500"
        },

        {
            name: "Chicken Tandoori",
            calories: 300,
            protein: 35,
            fat: 15,
            carbs: 6,
            image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=500"
        },

        {
            name: "Grilled Chicken",
            calories: 280,
            protein: 40,
            fat: 11,
            carbs: 2,
            image: "https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=500"
        },

        {
            name: "Chicken Curry",
            calories: 320,
            protein: 28,
            fat: 18,
            carbs: 10,
            image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=500"
        },

        {
            name: "Chicken Biryani",
            calories: 450,
            protein: 25,
            fat: 16,
            carbs: 55,
            image: "https://images.unsplash.com/photo-1563379091339-03246963d96c?w=500"
        },

        {
            name: "Chicken Seekh Kebab",
            calories: 290,
            protein: 25,
            fat: 18,
            carbs: 5,
            image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=500"
        },

        {
            name: "Chicken Sandwich",
            calories: 300,
            protein: 22,
            fat: 11,
            carbs: 30,
            image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=500"
        },

        {
            name: "Grilled Fish",
            calories: 220,
            protein: 30,
            fat: 9,
            carbs: 2,
            image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=500"
        },

        {
            name: "Fish Curry",
            calories: 260,
            protein: 25,
            fat: 14,
            carbs: 8,
            image: "https://images.unsplash.com/photo-1547592180-85f173990554?w=500"
        },

        {
            name: "Fish Tikka",
            calories: 240,
            protein: 29,
            fat: 11,
            carbs: 4,
            image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=500"
        },

        {
            name: "Chicken Soup",
            calories: 150,
            protein: 18,
            fat: 5,
            carbs: 8,
            image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=500"
        },

        {
            name: "Chicken Wrap",
            calories: 350,
            protein: 25,
            fat: 13,
            carbs: 36,
            image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=500"
        },

        {
            name: "Egg Sandwich",
            calories: 280,
            protein: 15,
            fat: 12,
            carbs: 28,
            image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=500"
        },

        {
            name: "Tuna Salad",
            calories: 230,
            protein: 30,
            fat: 8,
            carbs: 10,
            image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=500"
        },

        {
            name: "Chicken Salad",
            calories: 250,
            protein: 30,
            fat: 10,
            carbs: 12,
            image: "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=500"
        },

        {
            name: "Apple",
            calories: 95,
            protein: 0.5,
            fat: 0.3,
            carbs: 25,
            image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=500"
        },

        {
            name: "Banana",
            calories: 105,
            protein: 1.3,
            fat: 0.4,
            carbs: 27,
            image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=500"
        },

        {
            name: "Chicken Biryani - 1 Bowl",
            calories: 450,
            protein: 28,
            fat: 16,
            carbs: 48,
            image: "https://images.unsplash.com/photo-1563379091339-03246963d96c?w=500"
        },
        {
            name: "Chicken Curry - 1 Bowl",
            calories: 320,
            protein: 30,
            fat: 18,
            carbs: 8,
            image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=500"
        },
        {
            name: "Chicken Kebab",
            calories: 260,
            protein: 27,
            fat: 14,
            carbs: 6,
            image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=500"
        },
        {
            name: "Egg Curry - 2 Eggs",
            calories: 240,
            protein: 14,
            fat: 17,
            carbs: 7,
            image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500"
        },
        {
            name: "Fish Fry",
            calories: 280,
            protein: 27,
            fat: 16,
            carbs: 8,
            image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=500"
        },
        {
            name: "Prawn Curry",
            calories: 250,
            protein: 24,
            fat: 13,
            carbs: 8,
            image: "https://images.unsplash.com/photo-1562565652-a0d8f0c59eb4?w=500"
        },
        {
            name: "Chicken Soup",
            calories: 150,
            protein: 18,
            fat: 5,
            carbs: 8,
            image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=500"
        },
        {
            name: "Tuna Salad",
            calories: 230,
            protein: 30,
            fat: 8,
            carbs: 10,
            image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=500"
        },
    ],


    /* =====================================================
       VEGAN FOODS
    ===================================================== */

    vegan: [
        {
    name: "Tofu Bhurji",
    calories: 240,
    protein: 18,
    fat: 14,
    carbs: 10,
    image: "https://images.unsplash.com/photo-1547592180-85f173990554?w=500"
},

{
    name: "Soy Chunk Curry",
    calories: 260,
    protein: 24,
    fat: 8,
    carbs: 22,
    image: "https://images.unsplash.com/photo-1547592180-85f173990554?w=500"
},

{
    name: "Chickpea Salad",
    calories: 250,
    protein: 12,
    fat: 6,
    carbs: 35,
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500"
},

{
    name: "Lentil Soup",
    calories: 190,
    protein: 12,
    fat: 4,
    carbs: 28,
    image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=500"
},

{
    name: "Quinoa Vegetable Bowl",
    calories: 320,
    protein: 10,
    fat: 9,
    carbs: 48,
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500"
},

{
    name: "Peanut Salad",
    calories: 220,
    protein: 9,
    fat: 14,
    carbs: 16,
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500"
},
        {
            name: "Oats with Soy Milk",
            calories: 220,
            protein: 9,
            fat: 6,
            carbs: 32,
            image: "https://images.unsplash.com/photo-1517673132405-a56a62b18caf?w=500"
        },

        {
            name: "Vegetable Poha",
            calories: 220,
            protein: 5,
            fat: 7,
            carbs: 34,
            image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=500"
        },

        {
            name: "Tofu Bhurji",
            calories: 220,
            protein: 17,
            fat: 13,
            carbs: 8,
            image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500"
        },

        {
            name: "Chickpea Salad",
            calories: 240,
            protein: 12,
            fat: 7,
            carbs: 32,
            image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500"
        },

        {
            name: "Rajma",
            calories: 220,
            protein: 13,
            fat: 4,
            carbs: 35,
            image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=500"
        },

        {
            name: "Dal",
            calories: 180,
            protein: 10,
            fat: 5,
            carbs: 24,
            image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=500"
        },

        {
            name: "Vegetable Pulao",
            calories: 280,
            protein: 6,
            fat: 8,
            carbs: 45,
            image: "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=500"
        },

        {
            name: "Mixed Vegetable Salad",
            calories: 120,
            protein: 4,
            fat: 3,
            carbs: 18,
            image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500"
        },

        {
            name: "Peanut Chaat",
            calories: 180,
            protein: 8,
            fat: 12,
            carbs: 10,
            image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500"
        },

        {
            name: "Roasted Chana",
            calories: 160,
            protein: 8,
            fat: 3,
            carbs: 25,
            image: "https://images.unsplash.com/photo-1599909533603-9f4f5e4f4c6f?w=500"
        },

        {
            name: "Fruit Salad",
            calories: 130,
            protein: 2,
            fat: 1,
            carbs: 32,
            image: "https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?w=500"
        },

        {
            name: "Tofu Salad",
            calories: 200,
            protein: 16,
            fat: 11,
            carbs: 10,
            image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500"
        },

        {
            name: "Vegetable Soup",
            calories: 120,
            protein: 4,
            fat: 3,
            carbs: 18,
            image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=500"
        },

        {
            name: "Avocado Salad",
            calories: 240,
            protein: 4,
            fat: 20,
            carbs: 14,
            image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500"
        },

        {
            name: "Apple",
            calories: 95,
            protein: 0.5,
            fat: 0.3,
            carbs: 25,
            image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=500"
        },

        {
            name: "Banana",
            calories: 105,
            protein: 1.3,
            fat: 0.4,
            carbs: 27,
            image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=500"
        },

        {
            name: "Orange",
            calories: 62,
            protein: 1.2,
            fat: 0.2,
            carbs: 15,
            image: "https://images.unsplash.com/photo-1547514701-42782101795e?w=500"
        },

        {
            name: "Tofu Stir Fry",
            calories: 240,
            protein: 16,
            fat: 12,
            carbs: 18,
            image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500"
        },
        {
            name: "Chana Masala",
            calories: 270,
            protein: 12,
            fat: 8,
            carbs: 38,
            image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=500"
        },
        {
            name: "Lentil Soup",
            calories: 190,
            protein: 12,
            fat: 4,
            carbs: 28,
            image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=500"
        },
        {
            name: "Quinoa Vegetable Bowl",
            calories: 320,
            protein: 11,
            fat: 9,
            carbs: 48,
            image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500"
        },
        {
            name: "Avocado Salad",
            calories: 240,
            protein: 4,
            fat: 18,
            carbs: 18,
            image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500"
        },
        {
            name: "Peanut Butter Toast",
            calories: 260,
            protein: 9,
            fat: 14,
            carbs: 27,
            image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=500"
        },
        {
            name: "Coconut Vegetable Curry",
            calories: 280,
            protein: 7,
            fat: 18,
            carbs: 24,
            image: "https://images.unsplash.com/photo-1601050690117-94f5f6fa8bd7?w=500"
        },
    ]

};



    /* ================= VARIABLES ================= */

    let selectedPreference = "vegetarian";

    let selectedDay = "Monday";

    let dietPlan = {};


    const days = [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
    ];


    /* ================= INITIALIZE PLAN ================= */

    function createEmptyPlan() {

        const plan = {};

        days.forEach(function (day) {

            plan[day] = [];

        });

        return plan;
    }


    /* ================= LOAD SAVED PLAN ================= */

    const savedPlan =
        localStorage.getItem("healthConnectDietPlan");

    if (savedPlan) {

        try {

            dietPlan = JSON.parse(savedPlan);
            days.forEach(function (day) {
                if (!Array.isArray(dietPlan[day])) dietPlan[day] = [];
            });

        } catch (error) {

            dietPlan = createEmptyPlan();

        }

    } else {

        dietPlan = createEmptyPlan();

    }


    /* ================= GET HEALTH DATA ================= */

    function getHealthData() {

        const savedData =
            localStorage.getItem("healthConnectBMI");

        if (!savedData) {
            return null;
        }

        try {

            return JSON.parse(savedData);

        } catch (error) {

            return null;

        }

    }


    /* ================= GET CALORIE TARGET ================= */

   function getCalorieTarget() {

    const data = getHealthData();

    if (!data) {
        return 0;
    }

    // If a calorie target is already saved, use it
    if (data.targetCalories) {
        return Number(data.targetCalories);
    }

    if (data.calories) {
        return Number(data.calories);
    }

    // Calculate calories from saved BMI data
    if (
        !data.age ||
        !data.heightCm ||
        !data.weightKg
    ) {
        return 0;
    }

    const age = Number(data.age);
    const height = Number(data.heightCm);
    const weight = Number(data.weightKg);
    const gender = data.gender;
    const activity = data.activity;
    const goal = data.goal;

    let bmr;

    // Mifflin-St Jeor equation
    if (gender === "male") {

        bmr =
            (10 * weight) +
            (6.25 * height) -
            (5 * age) +
            5;

    } else if (gender === "female") {

        bmr =
            (10 * weight) +
            (6.25 * height) -
            (5 * age) -
            161;

    } else {

        const maleBMR =
            (10 * weight) +
            (6.25 * height) -
            (5 * age) +
            5;

        const femaleBMR =
            (10 * weight) +
            (6.25 * height) -
            (5 * age) -
            161;

        bmr = (maleBMR + femaleBMR) / 2;
    }

    let activityMultiplier;

    switch (activity) {

        case "sedentary":
            activityMultiplier = 1.2;
            break;

        case "light":
            activityMultiplier = 1.375;
            break;

        case "moderate":
            activityMultiplier = 1.55;
            break;

        case "active":
            activityMultiplier = 1.725;
            break;

        default:
            activityMultiplier = 1.2;
    }

    const tdee =
        bmr * activityMultiplier;

    let target;

    if (goal === "Gain Weight") {

        target = tdee + 300;

    } else if (goal === "Lose Weight") {

        target = tdee - 300;

    } else {

        target = tdee;
    }

    // Minimum calorie limits
    if (
        gender === "female" &&
        target < 1200
    ) {
        target = 1200;
    }

    if (
        gender !== "female" &&
        target < 1400
    ) {
        target = 1400;
    }

    return Math.round(target);
}

       


    function getFoodsForPreference(preference) {
        if (preference === "eggitarian") {
            const eggFoods = (foodDatabase.nonvegetarian || []).filter(function (food) {
                return /egg/i.test(food.name);
            });
            return (foodDatabase.vegetarian || []).concat(eggFoods);
        }
        return foodDatabase[preference] || [];
    }

    function getSelectedPlannerFood() {
        const foodSelect = document.getElementById("foodSelect");
        if (!foodSelect || foodSelect.value === "") return null;
        const foods = getFoodsForPreference(selectedPreference);
        return foods.find(function (food) {
            return food.name === foodSelect.value;
        }) || null;
    }


    /* ================= FOOD DROPDOWN ================= */

    function updateFoodDropdown() {

        const foodSelect =
            document.getElementById("foodSelect");

        if (!foodSelect) {
            return;
        }

        foodSelect.innerHTML =
            '<option value="">Choose a food</option>';

        const foods = getFoodsForPreference(selectedPreference);

        foods.forEach(function (food) {

            const option =
                document.createElement("option");

            option.value = food.name;

            option.textContent =
                food.name +
                " — " +
                food.calories +
                " kcal";

            foodSelect.appendChild(option);

        });

        updateFoodCalories();

    }


    /* ================= CALORIE PREVIEW ================= */

    function updateFoodCalories() {

        const foodSelect =
            document.getElementById("foodSelect");

        const quantityInput =
            document.getElementById("foodQuantity");

        const calorieDisplay =
            document.getElementById(
                "selectedFoodCalories"
            );

        if (
            !foodSelect ||
            !quantityInput ||
            !calorieDisplay
        ) {
            return;
        }

        const allFoods = Object.values(foodDatabase).flat();

const selectedFood = allFoods.find(function (food) {

    return food.name === foodSelect.value;

});


        if (!selectedFood) {

            calorieDisplay.textContent =
                "0 kcal";

            return;

        }


        const quantity =
            Math.max(1, Number(quantityInput.value) || 1);

        const totalCalories =
            selectedFood.calories * quantity;


        calorieDisplay.textContent =
            Math.round(totalCalories) +
            " kcal";

    }


    /* ================= ADD FOOD ================= */

    function addFood() {

        const foodSelect =
            document.getElementById("foodSelect");

        const quantityInput =
            document.getElementById("foodQuantity");

        const daySelect =
            document.getElementById("planDay");

        const mealSelect =
            document.getElementById("mealType");


        if (
            !foodSelect ||
            !quantityInput ||
            !daySelect ||
            !mealSelect
        ) {
            return;
        }


        const food = getSelectedPlannerFood();


        if (!food) {

            alert("Please select a food first.");

            return;

        }


        const quantity =
            Number(quantityInput.value) || 1;


        const day =
            daySelect.value;


        const meal =
            mealSelect.value;


        const calories =
            food.calories * quantity;


        if (!dietPlan[day]) {
            dietPlan[day] = [];
        }


        dietPlan[day].push({

            id: Date.now(),

            food: food.name,

            quantity: quantity,

            meal: meal,

            calories: calories

        });


        savePlan();

        selectedDay = day;

        updateAllDisplays();


        alert(
            food.name +
            " added to " +
            day +
            "!"
        );

    }


    /* ================= ADD CUSTOM FOOD ================= */

    function addCustomFood() {

        const nameInput =
            document.getElementById(
                "customFoodName"
            );

        const caloriesInput =
            document.getElementById(
                "customFoodCalories"
            );

        if (!nameInput || !caloriesInput) {
            return;
        }


        const name =
            nameInput.value.trim();

        const calories =
            Number(caloriesInput.value);


        if (!name) {

            alert("Please enter the food name.");

            return;

        }


        if (!calories || calories <= 0) {

            alert(
                "Please enter a valid calorie value."
            );

            return;

        }


        if (!dietPlan[selectedDay]) {
            dietPlan[selectedDay] = [];
        }


        const mealElement = document.getElementById("mealType");
        const meal = mealElement ? mealElement.value : "Snack";


        dietPlan[selectedDay].push({

            id: Date.now(),

            food: name,

            quantity: 1,

            meal: meal,

            calories: calories

        });


        nameInput.value = "";

        caloriesInput.value = "";


        savePlan();

        updateAllDisplays();


        alert(
            name +
            " added to " +
            selectedDay +
            "!"
        );

    }


    /* ================= REMOVE FOOD ================= */

    function removeFood(day, id) {

        if (!dietPlan[day]) {
            return;
        }


        dietPlan[day] =
            dietPlan[day].filter(function (item) {

                return item.id !== id;

            });


        savePlan();

        updateAllDisplays();

    }


    /* ================= DAY TOTAL ================= */

    function getDayCalories(day) {

        if (!dietPlan[day]) {
            return 0;
        }


        return dietPlan[day].reduce(
            function (total, item) {

                return total +
                    Number(item.calories);

            },
            0
        );

    }


    /* ================= UPDATE DAILY VIEW ================= */

    function updateDailyView() {

        const dayName =
            document.getElementById(
                "selectedDayName"
            );

        const dayCalories =
            document.getElementById(
                "selectedDayCalories"
            );

        const foodList =
            document.getElementById(
                "addedFoodList"
            );


        if (dayName) {
            dayName.textContent =
                selectedDay;
        }


        const total =
            getDayCalories(selectedDay);


        if (dayCalories) {

            dayCalories.textContent =
                Math.round(total);

        }


        if (!foodList) {
            return;
        }


        const foods =
            dietPlan[selectedDay] || [];


        if (foods.length === 0) {

            foodList.innerHTML = `

                <div class="empty-food-message">

                    <div>🍽️</div>

                    <strong>
                        No foods added yet
                    </strong>

                    <p>
                        Select a food above and add it
                        to build your daily plan.
                    </p>

                </div>

            `;

            return;

        }


        foodList.innerHTML = "";


        foods.forEach(function (item) {

            const foodRow =
                document.createElement("div");

            foodRow.className =
                "added-food-item";


            foodRow.innerHTML = `

                <div class="added-food-info">

                    <span class="added-food-meal">
                        ${item.meal}
                    </span>

                    <strong>
                        ${item.food}
                    </strong>

                    <small>
                        ${item.quantity} serving
                    </small>

                </div>


                <div class="added-food-calories">

                    <strong>
                        ${Math.round(item.calories)}
                    </strong>

                    <span>
                        kcal
                    </span>

                </div>


                <button
                    type="button"
                    class="remove-food-btn"
                    data-id="${item.id}"
                >
                    ×
                </button>

            `;


            const removeButton =
                foodRow.querySelector(
                    ".remove-food-btn"
                );


            removeButton.addEventListener(
                "click",
                function () {

                    removeFood(
                        selectedDay,
                        item.id
                    );

                }
            );


            foodList.appendChild(foodRow);

        });

    }


    /* ================= WEEKLY PLAN ================= */

    function updateWeeklyPlan() {

        const weeklyCards =
            document.querySelectorAll(
                ".weekly-day-card"
            );


        weeklyCards.forEach(function (card) {

            const day =
                card.getAttribute(
                    "data-weekly-day"
                );


            const total =
                getDayCalories(day);


            const calorieElement =
                card.querySelector(
                    ".weekly-day-calories"
                );


            const mealsElement =
                card.querySelector(
                    ".weekly-meals"
                );


            if (calorieElement) {

                calorieElement.textContent =
                    Math.round(total);

            }


            if (!mealsElement) {
                return;
            }


            const foods =
                dietPlan[day] || [];


            if (foods.length === 0) {

                mealsElement.textContent =
                    "No meals added";

                return;

            }


            mealsElement.innerHTML =
                foods.map(function (item) {

                    return `
                        <div class="weekly-food-row">

                            <span>
                                ${item.meal}
                            </span>

                            <strong>
                                ${item.food}
                            </strong>

                            <small>
                                ${Math.round(item.calories)} kcal
                            </small>

                        </div>
                    `;

                }).join("");

        });

    }


    /* ================= SUMMARY ================= */

    function updateDietSummary() {

    const data = getHealthData();

    const dietCalories =
        document.getElementById("dietCalories");

    const dietGoal =
        document.getElementById("dietGoal");

    const proteinTarget =
        document.getElementById("proteinTarget");

    const waterTarget =
        document.getElementById("waterTarget");


    /* ================= DAILY CALORIE TARGET ================= */

    const calories =
        getCalorieTarget();

    if (dietCalories) {

        if (calories > 0) {

            dietCalories.textContent =
                Math.round(calories);

        } else {

            dietCalories.textContent =
                "--";
        }
    }


    /* ================= GOAL ================= */

    if (dietGoal) {

        if (
            data &&
            data.goal
        ) {

            dietGoal.textContent =
                data.goal;

        } else {

            dietGoal.textContent =
                "--";
        }
    }


    /* ================= PROTEIN TARGET ================= */

    if (proteinTarget) {

        if (
            data &&
            Number(data.weightKg) > 0
        ) {

            const protein =
                Math.round(
                    Number(data.weightKg) * 1.6
                );

            proteinTarget.textContent =
                protein + " g";

        } else {

            proteinTarget.textContent =
                "--";
        }
    }


    /* ================= WATER TARGET ================= */

    if (waterTarget) {

        if (
            data &&
            Number(data.weightKg) > 0
        ) {

            const water =
                (
                    Number(data.weightKg) * 0.035
                ).toFixed(1);

            waterTarget.textContent =
                water + " L";

        } else {

            waterTarget.textContent =
                "--";
        }
    }
}
        

       

    async function savePlanToServer() {
        try {
            const healthData = getHealthData();
            const payload = {
                healthData: healthData || null,
                plan: dietPlan,
                savedAt: new Date().toISOString()
            };

            const response = await fetch("/api/diet", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                throw new Error("Server returned " + response.status);
            }

            return true;
        } catch (error) {
            console.warn("Diet plan was saved locally, but server save failed:", error);
            return false;
        }
    }


    /* ================= SAVE PLAN ================= */

    

        function savePlan() {

    localStorage.setItem(
        "healthConnectDietPlan",
        JSON.stringify(dietPlan)
    );

}

    /* ================= CLEAR PLAN ================= */

    function clearPlan() {

        const confirmClear =
            confirm(
                "Are you sure you want to clear your complete 7-day diet plan?"
            );


        if (!confirmClear) {
            return;
        }


        dietPlan =
            createEmptyPlan();


        savePlan();

        updateAllDisplays();

    }


    /* ================= UPDATE EVERYTHING ================= */

    function updateAllDisplays() {

        updateDailyView();

        updateWeeklyPlan();

        updateDietSummary();

    }


    /* ================= DAY BUTTONS ================= */

    function setupDayButtons() {

        const buttons =
            document.querySelectorAll(
                ".day-btn"
            );


        buttons.forEach(function (button) {

            button.addEventListener(
                "click",
                function () {

                    buttons.forEach(
                        function (btn) {

                            btn.classList.remove(
                                "active"
                            );

                        }
                    );


                    button.classList.add(
                        "active"
                    );


                    selectedDay =
                        button.getAttribute(
                            "data-day"
                        );


                    updateDailyView();

                }
            );

        });

    }


    /* ================= PREFERENCE BUTTONS ================= */

    function setupPreferenceButtons() {

        const buttons =
            document.querySelectorAll(
                ".diet-preference"
            );


        buttons.forEach(function (button) {

            button.addEventListener(
                "click",
                function () {

                    buttons.forEach(
                        function (btn) {

                            btn.classList.remove(
                                "active"
                            );

                        }
                    );


                    button.classList.add(
                        "active"
                    );


                    selectedPreference =
                        button.getAttribute(
                            "data-preference"
                        );


                    updateFoodDropdown();

                }
            );

        });

    }


    /* ================= EVENT LISTENERS ================= */

    function setupEvents() {

        const foodSelect =
            document.getElementById(
                "foodSelect"
            );


        const quantityInput =
            document.getElementById(
                "foodQuantity"
            );


        const addFoodButton =
            document.getElementById(
                "addFoodBtn"
            );


        const customFoodButton =
            document.getElementById(
                "addCustomFoodBtn"
            );


        const clearButton =
            document.getElementById(
                "clearDietPlanBtn"
            );


        const saveButton =
            document.getElementById(
                "saveDietPlanBtn"
            );


        if (foodSelect) {

            foodSelect.addEventListener(
                "change",
                updateFoodCalories
            );

        }


        if (quantityInput) {

            quantityInput.addEventListener(
                "input",
                updateFoodCalories
            );

        }


        if (addFoodButton) {

            addFoodButton.addEventListener(
                "click",
                addFood
            );

        }


        if (customFoodButton) {

            customFoodButton.addEventListener(
                "click",
                addCustomFood
            );

        }


        if (clearButton) {

            clearButton.addEventListener(
                "click",
                clearPlan
            );

        }

        if (saveButton) {

            saveButton.addEventListener(
                "click",
                function () {

                    savePlan();

                    savePlanToServer().then(function (serverSaved) {
                        if (serverSaved) {
                            alert("Your 7-day diet plan has been saved!");
                        } else {
                            alert("Your 7-day diet plan has been saved on this device. Server save was not available.");
                        }
                    });

                }
            );

        }
    }

    /* ================= START MODULE ================= */

    function initializeDietPlanner() {

        updateFoodDropdown();

        setupPreferenceButtons();

        setupDayButtons();

        setupEvents();

        updateAllDisplays();

    }


    if (
        document.readyState ===
        "loading"
    ) {

        document.addEventListener(
            "DOMContentLoaded",
            initializeDietPlanner
        );

    } else {

        initializeDietPlanner();
    }



/* =========================================================
   HEALTHCONNECT - DIET CUSTOMIZATION
    ========================================================= */
    /* =====================================================
   HEALTHCONNECT - DIET CUSTOMIZATION
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       ELEMENTS
    ===================================================== */

    const foodDay = document.getElementById("customizationFoodDay");
    const mealType = document.getElementById("customizationMealType");

    const foodSelect =
        document.getElementById("customizationFoodSelect");

    const selectedFoodCalories =
        document.getElementById("customizationSelectedFoodCalories");

    const foodInfoText =
        document.getElementById("customizationFoodInfoText");

    const addFoodBtn =
        document.getElementById("customizationAddFoodBtn");

    const preferenceButtons =
        document.querySelectorAll(".preference-btn");


    /* =====================================================
       CURRENT PREFERENCE
    ===================================================== */

    let currentPreference = "vegetarian";


    /* =====================================================
       FIND FOOD DATABASE
    ===================================================== */

    
       function getFoodList() {

    if (!window.foodDatabase) {
        console.error(
            "ERROR: foodDatabase is not available."
        );

        return [];
    }

    let foods;

    if (currentPreference === "eggitarian") {
        const eggFoods = (window.foodDatabase.nonvegetarian || []).filter(function (food) {
            return /egg/i.test(food.name);
        });
        foods = (window.foodDatabase.vegetarian || []).concat(eggFoods);
    } else {
        foods = window.foodDatabase[currentPreference];
    }

    if (!foods) {
        console.error(
            "No foods found for:",
            currentPreference
        );

        return [];
    }

    return foods;
}


    /* =====================================================
       LOAD FOOD OPTIONS
    ===================================================== */

    function loadFoodOptions() {

        if (!foodSelect) {
            console.error("foodSelect not found");
            return;
        }


        foodSelect.innerHTML =
            '<option value="">Select a food</option>';


        const foods = getFoodList();


        if (foods.length === 0) {

            console.log(
                "Food list is empty for:",
                currentPreference
            );

            return;

        }


        foods.forEach(function (food, index) {

            const option =
                document.createElement("option");


            option.value = index;


            option.textContent =
                food.name +
                " - " +
                food.calories +
                " kcal";


            foodSelect.appendChild(option);

        });


        if (selectedFoodCalories) {
            selectedFoodCalories.textContent = "0 kcal";
        }

        if (foodInfoText) {
            foodInfoText.textContent = "Select a food to see its nutrition information.";
        }

    }


    /* =====================================================
       PREFERENCE BUTTONS
    ===================================================== */

    preferenceButtons.forEach(function (button) {

        button.addEventListener("click", function () {


            preferenceButtons.forEach(function (btn) {

                btn.classList.remove("active");

            });


            button.classList.add("active");


            const text =
                button.textContent
                .toLowerCase()
                .trim();


            if (
                text.includes("non")
                ||
                text.includes("non-vegetarian")
            ) {

                currentPreference =
                    "nonvegetarian";

            }

            else if (
                text.includes("vegan")
            ) {

                currentPreference =
                    "vegan";

            }

            else if (
                text.includes("egg")
            ) {

                currentPreference =
                    "eggitarian";

            }

            else {

                currentPreference =
                    "vegetarian";

            }


            console.log(
                "Selected preference:",
                currentPreference
            );


            loadFoodOptions();

        });

    });


    /* =====================================================
       FOOD SELECTION
    ===================================================== */

    if (foodSelect) {

        foodSelect.addEventListener(
            "change",
            function () {


                if (foodSelect.value === "") {

                    selectedFoodCalories.textContent =
                        "0 kcal";

                    foodInfoText.textContent =
                        "Select a food to see its nutrition information.";

                    return;

                }


                const foods =
                    getFoodList();


                const food =
                    foods[
                        parseInt(foodSelect.value)
                    ];


                if (!food) {

                    console.error(
                        "Selected food not found."
                    );

                    return;

                }


                selectedFoodCalories.textContent =
                    food.calories +
                    " kcal";


                

                        foodInfoText.innerHTML = `
    <div class="food-preview">

        <img
            src="${food.image}"
            alt="${food.name}"
            class="food-preview-image"
        >

        <div class="food-preview-details">

            <h3>${food.name}</h3>

            <div class="nutrition-grid">

                <div>
                    <strong>${food.calories}</strong>
                    <span>Calories</span>
                </div>

                <div>
                    <strong>${food.protein || 0} g</strong>
                    <span>Protein</span>
                </div>

                <div>
                    <strong>${food.fat || 0} g</strong>
                    <span>Fat</span>
                </div>

                <div>
                    <strong>${food.carbs || 0} g</strong>
                    <span>Carbs</span>
                </div>

            </div>

        </div>

    </div>
`;

            }
        );

    }


    /* =====================================================
       ADD FOOD TO 7-DAY PLAN
    ===================================================== */

    if (addFoodBtn) {

        addFoodBtn.addEventListener(
            "click",
            function () {


                if (foodSelect.value === "") {

                    alert(
                        "Please select a food first."
                    );

                    return;

                }


                const foods =
                    getFoodList();


                const food =
                    foods[
                        parseInt(foodSelect.value)
                    ];


                if (!food) {

                    alert(
                        "Food information could not be found."
                    );

                    return;

                }


                const day =
                    foodDay.value;


                const meal =
                    mealType.value;

                // Also save the customized food into the same 7-day plan
                // used by the main Diet Planner.
                if (!dietPlan[day]) {
                    dietPlan[day] = [];
                }

                dietPlan[day].push({
                    id: Date.now() + Math.floor(Math.random() * 1000),
                    food: food.name,
                    quantity: 1,
                    meal: meal,
                    calories: food.calories
                });

                savePlan();
                selectedDay = day;
                updateAllDisplays();


                foodInfoText.innerHTML = `

                    <div class="success-message">

                        ✓ ${food.name}
                        added to
                        ${day}
                        ${meal}

                    </div>

                `;


                foodSelect.value = "";

                selectedFoodCalories.textContent =
                    "0 kcal";

            }
        );

    }


    /* =====================================================
       INITIAL LOAD
    ===================================================== */

    loadFoodOptions();

});

})();

/* =====================================================
   MODULE 6: AI HEALTH ASSISTANT
===================================================== */
(function () {
    const form = document.getElementById("aiForm");
    if (!form) return;
    const questionInput = document.getElementById("aiQuestion");
    const status = document.getElementById("aiStatus");
    const submit = document.getElementById("aiSubmit");
    const connection = document.getElementById("aiConnection");
    const includeContext = document.getElementById("aiIncludeContext");
    const characterCount = document.getElementById("aiCharacterCount");

    if (questionInput && characterCount) {
        questionInput.addEventListener("input", function () {
            characterCount.textContent = questionInput.value.length + " / 1,200";
        });
    }

    if (connection) {
        fetch("/api/ai/status")
            .then(function (response) { return response.json(); })
            .then(function (result) {
                connection.textContent = result.configured
                    ? "AI assistant is ready. Ask a question to get started."
                    : "AI setup needed: add OPENAI_API_KEY to the server .env file, then restart the server.";
                connection.classList.toggle("is-ready", Boolean(result.configured));
                connection.classList.toggle("is-unavailable", !result.configured);
            })
            .catch(function () {
                connection.textContent = "Can’t check AI setup right now. Make sure the app server is running.";
                connection.classList.add("is-unavailable");
            });
    }

    form.addEventListener("submit", async function (event) {
        event.preventDefault();
        const question = questionInput.value.trim();
        if (!question) return;

        submit.disabled = true;
        status.textContent = "Thinking…";
        status.classList.add("is-loading");
        try {
            let health = {};
            if (includeContext && includeContext.checked) {
                try {
                    health = JSON.parse(localStorage.getItem("healthConnectBMI") || "{}");
                } catch (_) { /* Ignore malformed old browser data. */ }
            }
            const response = await fetch("/api/ai/ask", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ question, health })
            });
            const result = await response.json().catch(function () { return {}; });
            if (!response.ok) throw new Error(result.message || "The assistant could not answer right now.");
            status.textContent = result.answer;
            status.classList.remove("is-error");
        } catch (error) {
            status.textContent = error.message || "Could not reach the assistant. Check your connection and try again.";
            status.classList.add("is-error");
        } finally {
            status.classList.remove("is-loading");
            submit.disabled = false;
        }
    });
})();

/* =====================================================
   HEALTHCONNECT - MODULE 5
   WORKOUT PLANNER
===================================================== */

(function () {

    function generateWorkoutPlan() {

        const goalElement =
            document.getElementById("workoutGoal");

        const levelElement =
            document.getElementById("fitnessLevel");

        const durationElement =
            document.getElementById("workoutDuration");

        const resultElement =
            document.getElementById("workoutResult");

        if (
            !goalElement ||
            !levelElement ||
            !durationElement ||
            !resultElement
        ) {
            console.error(
                "Module 5: Workout Planner elements not found."
            );
            return;
        }

        const goal = goalElement.value;
        const level = levelElement.value;
        const duration = durationElement.value;

        if (!goal || !level || !duration) {
            alert(
                "Please select workout goal, fitness level and duration."
            );
            return;
        }

        let workoutPlan = [];

        /* ================= WEIGHT LOSS ================= */

        if (goal === "weight-loss") {

            if (level === "beginner") {

                workoutPlan = [
                    {
                        day: "Monday",
                        workout: "Full Body + Cardio",
                        exercises: [
                            "Bodyweight Squats - 3 × 12",
                            "Wall Push-ups - 3 × 10",
                            "Seated Cable Row - 3 × 12",
                            "Glute Bridge - 3 × 12",
                            "Walking / Treadmill - 15 min"
                        ]
                    },
                    {
                        day: "Tuesday",
                        workout: "Cardio",
                        exercises: [
                            "Brisk Walking - 20 min",
                            "Cycling - 15 min",
                            "Light Stretching - 5 min"
                        ]
                    },
                    {
                        day: "Wednesday",
                        workout: "Upper Body",
                        exercises: [
                            "Chest Press - 3 × 12",
                            "Lat Pulldown - 3 × 12",
                            "Shoulder Press - 3 × 10",
                            "Bicep Curl - 3 × 12",
                            "Triceps Pushdown - 3 × 12"
                        ]
                    },
                    {
                        day: "Thursday",
                        workout: "Active Recovery",
                        exercises: [
                            "Walking - 20 min",
                            "Light Stretching - 10 min"
                        ]
                    },
                    {
                        day: "Friday",
                        workout: "Lower Body + Cardio",
                        exercises: [
                            "Leg Press - 3 × 12",
                            "Romanian Deadlift - 3 × 10",
                            "Leg Curl - 3 × 12",
                            "Calf Raises - 3 × 15",
                            "Treadmill - 15 min"
                        ]
                    },
                    {
                        day: "Saturday",
                        workout: "Full Body",
                        exercises: [
                            "Chest Press - 3 × 12",
                            "Lat Pulldown - 3 × 12",
                            "Leg Press - 3 × 12",
                            "Cable Row - 3 × 12",
                            "Walking - 15 min"
                        ]
                    },
                    {
                        day: "Sunday",
                        workout: "Rest Day",
                        exercises: [
                            "Rest",
                            "Light Walking",
                            "Stretching"
                        ]
                    }
                ];

            } else {

                workoutPlan = [
                    {
                        day: "Monday",
                        workout: "Chest + Triceps",
                        exercises: [
                            "Chest Press - 3 × 12",
                            "Incline Dumbbell Press - 3 × 10",
                            "Cable Fly - 3 × 12",
                            "Triceps Pushdown - 3 × 12"
                        ]
                    },
                    {
                        day: "Tuesday",
                        workout: "Back + Biceps",
                        exercises: [
                            "Lat Pulldown - 3 × 12",
                            "Seated Cable Row - 3 × 12",
                            "Face Pull - 3 × 12",
                            "Bicep Curl - 3 × 12"
                        ]
                    },
                    {
                        day: "Wednesday",
                        workout: "Cardio + Abs",
                        exercises: [
                            "Incline Treadmill - 20 min",
                            "Cycling - 15 min",
                            "Plank - 3 × 30 sec",
                            "Crunches - 3 × 15"
                        ]
                    },
                    {
                        day: "Thursday",
                        workout: "Shoulders + Arms",
                        exercises: [
                            "Shoulder Press - 3 × 10",
                            "Lateral Raise - 3 × 12",
                            "Bicep Curl - 3 × 12",
                            "Triceps Pushdown - 3 × 12"
                        ]
                    },
                    {
                        day: "Friday",
                        workout: "Legs",
                        exercises: [
                            "Leg Press - 3 × 12",
                            "Romanian Deadlift - 3 × 10",
                            "Leg Curl - 3 × 12",
                            "Calf Raises - 3 × 15"
                        ]
                    },
                    {
                        day: "Saturday",
                        workout: "Full Body + Cardio",
                        exercises: [
                            "Chest Press - 3 × 12",
                            "Lat Pulldown - 3 × 12",
                            "Leg Press - 3 × 12",
                            "Cable Row - 3 × 12",
                            "Treadmill - 20 min"
                        ]
                    },
                    {
                        day: "Sunday",
                        workout: "Rest Day",
                        exercises: [
                            "Rest",
                            "Light Walking",
                            "Stretching"
                        ]
                    }
                ];
            }
        }

        /* ================= MUSCLE GAIN ================= */

        else if (goal === "muscle-gain") {

            workoutPlan = [
                {
                    day: "Monday",
                    workout: "Chest + Triceps",
                    exercises: [
                        "Chest Press - 3 × 10",
                        "Incline Dumbbell Press - 3 × 10",
                        "Cable Fly - 3 × 12",
                        "Triceps Pushdown - 3 × 12"
                    ]
                },
                {
                    day: "Tuesday",
                    workout: "Back + Biceps",
                    exercises: [
                        "Lat Pulldown - 3 × 10",
                        "Seated Cable Row - 3 × 10",
                        "Face Pull - 3 × 12",
                        "Bicep Curl - 3 × 12"
                    ]
                },
                {
                    day: "Wednesday",
                    workout: "Rest / Recovery",
                    exercises: [
                        "Light Walking",
                        "Stretching"
                    ]
                },
                {
                    day: "Thursday",
                    workout: "Shoulders",
                    exercises: [
                        "Shoulder Press - 3 × 10",
                        "Lateral Raise - 3 × 12",
                        "Rear Delt Fly - 3 × 12"
                    ]
                },
                {
                    day: "Friday",
                    workout: "Legs",
                    exercises: [
                        "Leg Press - 3 × 10",
                        "Romanian Deadlift - 3 × 10",
                        "Leg Curl - 3 × 12",
                        "Calf Raises - 3 × 15"
                    ]
                },
                {
                    day: "Saturday",
                    workout: "Full Body",
                    exercises: [
                        "Chest Press - 3 × 10",
                        "Lat Pulldown - 3 × 10",
                        "Leg Press - 3 × 10",
                        "Cable Row - 3 × 10"
                    ]
                },
                {
                    day: "Sunday",
                    workout: "Rest Day",
                    exercises: [
                        "Rest",
                        "Light Stretching"
                    ]
                }
            ];
        }

        /* ================= MAINTENANCE ================= */

        else {

            workoutPlan = [
                {
                    day: "Monday",
                    workout: "Full Body",
                    exercises: [
                        "Chest Press - 3 × 12",
                        "Lat Pulldown - 3 × 12",
                        "Leg Press - 3 × 12",
                        "Cable Row - 3 × 12"
                    ]
                },
                {
                    day: "Tuesday",
                    workout: "Cardio",
                    exercises: [
                        "Walking - 20 min",
                        "Cycling - 15 min"
                    ]
                },
                {
                    day: "Wednesday",
                    workout: "Upper Body",
                    exercises: [
                        "Chest Press - 3 × 12",
                        "Lat Pulldown - 3 × 12",
                        "Shoulder Press - 3 × 10",
                        "Bicep Curl - 3 × 12"
                    ]
                },
                {
                    day: "Thursday",
                    workout: "Recovery",
                    exercises: [
                        "Walking",
                        "Stretching"
                    ]
                },
                {
                    day: "Friday",
                    workout: "Lower Body",
                    exercises: [
                        "Leg Press - 3 × 12",
                        "Romanian Deadlift - 3 × 10",
                        "Leg Curl - 3 × 12",
                        "Calf Raises - 3 × 15"
                    ]
                },
                {
                    day: "Saturday",
                    workout: "Full Body + Cardio",
                    exercises: [
                        "Chest Press - 3 × 12",
                        "Cable Row - 3 × 12",
                        "Leg Press - 3 × 12",
                        "Walking - 15 min"
                    ]
                },
                {
                    day: "Sunday",
                    workout: "Rest Day",
                    exercises: [
                        "Rest",
                        "Light Stretching"
                    ]
                }
            ];
        }

        /* ================= DISPLAY ================= */

        let html = "";

        workoutPlan.forEach(function (dayPlan) {

            html += `
                <div class="workout-day-card">

                    <div class="workout-day-header">
                        <h3>${dayPlan.day}</h3>
                        <span>${dayPlan.workout}</span>
                    </div>

                    <div class="workout-exercises">
            `;

            dayPlan.exercises.forEach(function (exercise) {

                html += `
                    <div class="workout-exercise">
                        <span>💪</span>
                        <strong>${exercise}</strong>
                    </div>
                `;

            });

            html += `
                    </div>

                    <small>
                        Duration: ${duration}
                    </small>

                </div>
            `;
        });

        resultElement.innerHTML = html;

        console.log(
            "Workout plan generated successfully:",
            {
                goal: goal,
                level: level,
                duration: duration
            }
        );
    }


    /* =====================================================
       MAKE FUNCTION AVAILABLE TO HTML
    ===================================================== */

    window.generateWorkoutPlan =
        generateWorkoutPlan;


    /* =====================================================
       INITIALIZE MODULE 5
    ===================================================== */

(function () {

    function initializeWorkoutPlanner() {

        const button = document.getElementById("generateWorkoutBtn");

        if (!button) {
            console.warn("Module 5: Generate Workout button not found.");
            return;
        }

        button.onclick = function (event) {

            event.preventDefault();

            if (typeof generateWorkoutPlan === "function") {
                generateWorkoutPlan();
            } else {
                console.error("generateWorkoutPlan function not found.");
            }

            return false;
        };
    }

    if (document.readyState === "loading") {

        document.addEventListener(
            "DOMContentLoaded",
            initializeWorkoutPlanner
        );

    } else {

        initializeWorkoutPlanner();

    }

})();

})();
