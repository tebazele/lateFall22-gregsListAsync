export class Job {
    constructor(data) {
        // this.keys = data.keys
        this.company = data.company || ''
        this.createdAt = new Date(data.createdAt) || new Date
        this.description = data.description || ''
        this.hours = data.hours || 0
        this.id = data.id
        this.jobTitle = data.jobTitle || ''
        this.rate = data.rate || 0
        this.imgUrl = 'https://images.unsplash.com/photo-1553729459-efe14ef6055d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80'
    }

    get JobTemplate() {
        return `<div class="col-4 p-4">
        <div class="card">
          <img src="${this.imgUrl}" class="card-img-top"
            alt="job">
          <div class="card-body">
            <div class="card-title mb-2">
              <p>${this.jobTitle} at ${this.company}</p>
              <p>${this.hours}hrs </p>
              <p>${this.rate}/hr </p>
            </div>
             <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="app.jobsController.setActiveJob('${this.id}')">
                Edit
              </button>
            <button onclick="app.jobsController.removeJob('${this.id}')" title="Delete job!" class="btn btn-danger">
                <i class="mdi mdi-delete"></i>
              </button>
          </div>
        </div>
      </div>`
    }

    static JobFormTemplate(job) {
        if (!job) {
            job = new Job({})
        }
        return `<form onsubmit="app.jobsController.${job.id ? `editJob('${job.id}')` : 'createJob()'}">
        <div class="form-floating mb-3">
            <input type="text" class="form-control" id="job-title" name="jobTitle" placeholder="Job Title" value='${job.jobTitle}' required>
            <label for="job-title">Job Title</label>
          </div>
        <div class="form-floating mb-3">
            <input type="text" class="form-control" id="company" name="company" placeholder="Company" value='${job.company}' required>
            <label for="company">Company</label>
          </div>
        <div class="form-floating mb-3">
            <input type="text" class="form-control" id="description" name="description" placeholder="description" value='${job.description}' required>
            <label for="description">description</label>
          </div>
        <div class="form-floating mb-3">
            <input type="number" class="form-control" id="hours" name="hours" placeholder="hours" value='${job.hours}' required>
            <label for="hours">hours</label>
          </div>
        <div class="form-floating mb-3">
            <input type="number" class="form-control" id="rate" name="rate" placeholder="rate" value='${job.rate}' required>
            <label for="rate">rate</label>
          </div>
          <button type="submit" class="btn btn-success my-3">Submit</button>
          <button type="reset" class="btn btn-outline-danger my-3">Reset</button>
        </form>
        `
    }
}