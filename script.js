document.getElementById("ee-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const formData = {
      "Date of Completion": document.getElementById("date-completion").value,
      Department: document.getElementById("department").value,
      "Job Title and Job Profile": document.getElementById("job-title").value,
      "Occupational Level": document.getElementById("occupational-level").value,
      "Urgency Level": document.getElementById("urgency-level").value,
      "New Position or Replacement Position": document.getElementById("position-type").value,
      "Targeted Sub-Race and Gender Groups (Highest Priority)": document.getElementById("priority-highest").value,
      "Targeted Sub-Race and Gender Groups (Next Highest)": document.getElementById("priority-next-highest").value,
      "Targeted Sub-Race and Gender Groups (Third Highest)": document.getElementById("priority-third-highest").value,
      "Preferred Candidate Aligned to Highest Priority": document.getElementById("preferred-alignment").value,
      Qualifications: document.getElementById("qualifications").value,
      "Prior Learning": document.getElementById("prior-learning").value,
      "Relevant Experience": document.getElementById("experience").value,
      "Acquirable Competencies": document.getElementById("competencies").value,
      "Job Profile": document.getElementById("job-profile").value,
      "Advertising Channels": document.getElementById("advertising-channels").value,
      "Response Numbers": document.getElementById("response-numbers").value,
      "Shortlist Demographics": document.getElementById("shortlist-demographics").value,
      "Reasons Not Selected": document.getElementById("reasons-not-selected").value,
      "Recruiting Line Manager": document.getElementById("recruiting-manager").value,
      "Senior Manager Responsible for EE": document.getElementById("senior-manager").value,
      CEO: document.getElementById("ceo").value,
  };

  const csvContent = Object.keys(formData)
      .join(",") +
      "\n" +
      Object.values(formData)
          .map(value => `"${value}"`)
          .join(",");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "EE_Deviation_Record.csv";
  link.style.display = "none";

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
});
