const filters = {
    hours: '',
    role: '',
    remote: '',
    regions: []
}


document.querySelectorAll('.option').forEach(item => {
    item.addEventListener('click', event => {

        const target = event.target
        const targetClass = target.classList[1]

        document.querySelectorAll(`.${targetClass}`).forEach((option) => {
            option.style.background = 'aliceblue'
          });

        target.style.background = 'rgb(181, 220, 255)'

        // Hours
        if (target.classList.contains('hours-option')) {
            switch (target.id) {
                case 'full-time':
                    filters.hours = 'Full-Time'
                    break;
                    
                case 'part-time':
                    filters.hours = 'Part-Time'
                    break;

                case 'intern':
                    filters.hours = 'Intern'
                    break;

                case 'contract':
                    filters.hours = 'Contract'
                    break;
            
                default:
                    break;
            }
        }

        // Roles
        if (target.classList.contains('roles-option')) {
            switch (target.id) {
                case 'junior':
                    filters.role = 'Junior IC'
                    break;
                    
                case 'senior':
                    filters.role = 'Senior IC'
                    break;

                case 'manager':
                    filters.role = 'Manager'
                    break;
            
                default:
                    break;
            }
        }

        // Remote
        if (target.classList.contains('remote-option')) {
            switch (target.id) {
                case 'remote':
                    filters.remote = 'TRUE'
                    break;
                    
                case 'onsite':
                    filters.remote = 'FALSE'
                    break;
            
                default:
                    break;
            }
        }

        // Region
        if (target.classList.contains('regions-option')) {
            switch (target.id) {
                case 'drenthe':
                    filters.regions.push('Drenthe')
                    break;
                case 'flevoland':
                    filters.regions.push('Flevoland')
                    break;
                case 'friesland':
                    filters.regions.push('Friesland')
                    break;
                case 'gelderland':
                    filters.regions.push('Gelderland')
                    break;
                case 'groningen':
                    filters.regions.push('Groningen')
                    break;
                case 'limburg':
                    filters.regions.push('Limburg')
                    break;
                case 'north-holland':
                    filters.regions.push('North Holland')
                    break;
                case 'north-brabant':
                    filters.regions.push('North Brabant')
                    break;
                case 'overijssel':
                    filters.regions.push('Overijssel')
                    break;
                case 'south-holland':
                    filters.regions.push('South Holland')
                    break;
                case 'zeeland':
                    filters.regions.push('Zeeland')
                    break;
            
                default:
                    break;
            }
        }
    })
})



document.querySelector('button').addEventListener('click', showMeData);

async function showMeData() {
    const API_KEY = prompt('Your API key:')

    const getData = async () => {
        const myHeaders = new Headers();
        myHeaders.append("x-api-key", API_KEY)
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
        "filters": [
            
            {
                "field": "hours",
                "operator": "IS_IN",
                "value": [
                    filters.hours
                ]
            },

            {
                "field": "seniority",
                "operator": "IS_IN",
                "value": [
                    filters.role
                ]
            },

            {
                "field": "remote",
                "operator": "IS_IN",
                "value": [
                    filters.remote
                ]
            },

            {
                "field": "region",
                "operator": "IS_IN",
                "value": filters.regions
            },

        ],
        "count_only": false,
        "limit": 3
        });

        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        const response =  await fetch("https://148581a8-8e6e-4837-a77e-d8733cf62e83.mock.pstmn.io/jobs", requestOptions)

        const data = await response.json();
        return data;
    }
    
    const jsonData = await getData()
    console.log(jsonData)

    document.getElementById('job-1').innerHTML = jsonData.data[0].job_name;
    document.getElementById('job-2').innerHTML = jsonData.data[1].job_name;
}