function scheduler() {
    return {
        newCohort: {
            code: '',
            noOfStudents: '',
        },
        newSchedule: {
            title: '',
            courseDurationInWeeks: '',
            startTime: '',
            classDurationInHours: '',
            dayInWeek: '',
            venueId: '',
        },
        newClass: {
            scheduleId: '',
            venueId: '', 
        },
        venues: [],
        cohorts: [],
        schedules: [],
        classes: [],
        days: ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"],

        init() {
            this.fetchVenues();
            this.fetchCohorts();
            this.fetchSchedules();
            this.fetchClasses();
        },

        fetchVenues() {
            fetch('https://neo-cloud-training.onrender.com/v1/venue/')
                .then(response => response.json())
                .then(data => this.venues = data);
        },

        fetchCohorts() {
            fetch('https://neo-cloud-training.onrender.com/v1/cohort/')
                .then(response => response.json())
                .then(data => this.cohorts = data);
        },

        fetchSchedules() {
            fetch('https://neo-cloud-training.onrender.com/v1/schedule/')
                .then(response => response.json())
                .then(data => this.schedules = data);
        },

        fetchClasses() {
            fetch('https://neo-cloud-training.onrender.com/v1/class/')
                .then(response => response.json())
                .then(data => this.classes = data);
        },

        createCohort() {
            fetch('https://neo-cloud-training.onrender.com/v1/cohort/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(this.newCohort),
            })
            .then(response => response.json())
            .then(data => {
                this.cohorts.push(data);
                this.newCohort = { code: '', noOfStudents: '' }; // Reset form
            });
        },

        createSchedule() {
            fetch('https://neo-cloud-training.onrender.com/v1/schedule/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(this.newSchedule),
            })
            .then(response => response.json())
            .then(data => {
                this.schedules.push(data);
                this.newSchedule = { title: '', courseDurationInWeeks: '', startTime: '', classDurationInHours: '', dayInWeek: '', venueId: '' }; // Reset form
            });
        },

        createClass() {
            fetch('https://neo-cloud-training.onrender.com/v1/class/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(this.newClass),
            })
            .then(response => response.json())
            .then(data => {
                this.classes.push(data);
                this.newClass = { scheduleId: '', venueId: '' }; 
                this.fetchClasses(); // Refresh class list
            });
        },
        

        deleteClass(classId) {
            fetch(`https://neo-cloud-training.onrender.com/v1/class/${classId}`, {
                method: 'DELETE',
            })
            .then(response => {
                if (response.ok) {
                    // Remove the deleted class from the local array
                    this.classes = this.classes.filter(classItem => classItem.id !== classId);
                } else {
                    console.error('Failed to delete class');
                }
            });
        },

        deleteCohort(cohortId) {
            fetch(`https://neo-cloud-training.onrender.com/v1/cohort/${cohortId}`, {
                method: 'DELETE',
            })
            .then(response => {
                if (response.ok) {
                    // Remove the deleted cohort from the local array
                    this.cohorts = this.cohorts.filter(cohort => cohort.id !== cohortId);
                } else {
                    console.error('Failed to delete cohort');
                }
            });
        }
    };
}
