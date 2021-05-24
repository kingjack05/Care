const datapointData = [
    {
        name: "Abdominal Pain",
        datapointType: "Boolean",
        category: "Symptom",
        normalValue: false,
        options: [
            {
                name: "Location",
                optionType: "Multiple Choice",
                data: [
                    "RUQ",
                    "MUQ",
                    "LUQ",
                    "RMQ",
                    "MMQ",
                    "LMQ",
                    "RLQ",
                    "MLQ",
                    "LLQ",
                ],
            },
            {
                name: "Quality",
                optionType: "Multiple Choice",
                data: ["Diffuse", "Localized", "Burning"],
            },
        ],
    },
    {
        name: "Allergies",
        datapointType: "Array",
        category: "Other",
    },
    {
        name: "Current Medications",
        datapointType: "Array",
        category: "Other",
    },
]

module.exports = datapointData
