import { appState } from "../AppState.js";
import { Job } from "../Models/Job.js";
import { jobsService } from "../Services/JobsService.js";
import { getFormData } from "../Utils/FormHandler.js";
import { Pop } from "../Utils/Pop.js";
import { setHTML } from "../Utils/Writer.js";

function _drawJobs() {
    let template = ''
    appState.jobs.forEach(job => template += job.JobTemplate)
    setHTML('listings', template)
}

function _drawJobsForm() {
    let job = appState.activeJob
    setHTML('listing-form', Job.JobFormTemplate(job))
}


export class JobsController {
    constructor() {
        // console.log('jobs controller linked up');
        // set up listeners here
        appState.on('jobs', _drawJobs)
        appState.on('activeJob', _drawJobsForm)
    }

    async getJobs() {
        try {
            // send this over to the Service to get the data
            await jobsService.getJobs()
        } catch (error) {
            console.log(error);
        }
    }

    async showJobs() {
        // console.log('showing Jobs')
        try {
            await this.getJobs()
            console.log('drawing jobs');
            _drawJobs()
            _drawJobsForm()
        } catch (error) {
            console.log(error);
        }
    }

    setActiveJob(id) {
        jobsService.setActiveJob(id)
    }

    async createJob() {
        // console.log('creating job')
        try {
            // @ts-ignore
            window.event.preventDefault()
            // @ts-ignore
            let form = window.event.target
            let jobData = getFormData(form)
            await jobsService.createJob(jobData)
            form.reset()
        } catch (error) {

        }

    }

    async editJob(id) {
        console.log('editing job');
        try {
            // @ts-ignore
            window.event.preventDefault()
            // @ts-ignore
            const form = window.event.target
            const jobData = getFormData(form)
            await jobsService.editJob(jobData, id)
            Pop.toast('Job created/edited', 'success')
        } catch (error) {
            console.log(error);
        }

    }

    async removeJob(id) {
        try {
            if (await Pop.confirm('Are you sure you want to delete this?')) {
                await jobsService.removeJob(id)
                Pop.toast('Job deleted', 'success')
            }
        } catch (error) {
            console.log(error);
        }
    }
}