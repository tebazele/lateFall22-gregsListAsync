import { appState } from "../AppState.js"
import { Job } from "../Models/Job.js";
// import { getFormData } from "../Utils/FormHandler.js";


class JobsService {
    async getJobs() {
        // axios.get the data
        try {
            // @ts-ignore
            let response = await axios.get('http://localhost:3000/api/jobs')
            console.log('got jobs', response.data);
            appState.jobs = response.data.map(job => new Job(job))
            console.log(appState.jobs);
        } catch (error) {
            console.log(error);
        }
    }

    setActiveJob(id) {
        let foundJob = appState.jobs.find(j => j.id == id)
        appState.activeJob = foundJob
        console.log('foundJob', foundJob);
    }
    async createJob(jobData) {
        try {
            // @ts-ignore
            let res = await axios.post('http://localhost:3000/api/jobs', jobData)
            // console.log('post jobs', res.data)
            let newJob = new Job(jobData)
            appState.jobs = [...appState.jobs, newJob]
        } catch (error) {

        }
    }

    async editJob(jobData, id) {
        try {
            // @ts-ignore
            let res = await axios.put('http://localhost:3000/api/jobs/' + id, jobData)
            console.log('edited job', res.data);
            let index = appState.jobs.findIndex(j => j.id == id)
            appState.jobs.splice(index, 1, new Job(res.data))
            appState.emit('jobs')
        } catch (error) {
            console.log(error);
        }

    }
    async removeJob(id) {
        try {
            // @ts-ignore
            let res = await axios.delete('http://localhost:3000/api/jobs/' + id)
            console.log('DELETE job', res.data);
            appState.jobs = appState.jobs.filter(j => j.id != id)
        } catch (error) {
            console.log(error);
        }
    }

}

export const jobsService = new JobsService()