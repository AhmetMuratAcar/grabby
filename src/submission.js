document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('important-dates-form');

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent form submission to check for editing mode

        const isAnyEditable = Array.from(document.querySelectorAll('.card-title, .card-text'))
                                   .some(element => element.getAttribute('contenteditable') === 'true');
        
        // console.log(isAnyEditable);

        if (isAnyEditable) {
            const userConfirmed = confirm('You are still editing some dates. Are you sure you want to submit?');
            if (userConfirmed) {
                handleSubmit();
            }
        } else {
            handleSubmit();
        }
    });
});

function handleSubmit() {
    const importantDatesContainers = document.querySelectorAll('.important-date-card');
    const importantDates = Array.from(importantDatesContainers).map(container => {
        // Always include title and date
        const eventObject = {
            title: container.querySelector('.card-title').textContent.trim(),
            date: container.querySelector('.date').textContent.trim(),
        };

        // Conditionally add time if present
        const timeElement = container.querySelector('.time');
        if (timeElement) {
            eventObject.time = timeElement.textContent.trim();
        }

        return eventObject;
    });

    const data = {
        important_dates: importantDates
    };

    console.log(JSON.stringify(data)); // For debugging

    // Add Google Calendar API logic here
}