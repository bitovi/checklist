# JavaScript Project Checklist

## Questions:

__Project name__


__Company name__


__Was the project a success?__


- Yes
- No


### Management

#### People know what they are trying to accomplish.

__What is the project's vision?__
> This is typically a single sentence that describes what the project aspires to be.  Example: "A JS framework that allows developers to build better apps, faster". If this doesn't exist, write "none".

__How will the project measure success?__
> Example: Increase mobile conversion rates to 0.75-1.0%, currently ~0.3%. If this doesn't exist, write "none".

__What is the strategy for accomplishing the project's goals?__
> Example: Combine the desktop and mobile sites for an improved user experience, site parity, and centralized ownership. If this doesn't exist, write "none".

__What is the project's roadmap?  What are the goals, plans and release schedule after the current release?__
> Example: Phase 1: Complete A, B, C. Phase 2: Complete D, E, F.  If there are no plans, write "none".

##### People are capable of accomplishing the goals.

> Do people have the skills needed to accomplish the goals and roadmap?  Is the roadmap possible? Is there the access across the organizational bureaucracy?

__Do all employees go through a technical training?__
> For example a week long JS training.


- Yes
- No

__Is there at least a yearly additional training opportunities for all employees?__


- Yes
- No

__How long until something can be released?__


- 3 months
- 6 months
- 1 year
- 1.5 years

__What is the org chart?__
> Each person's name and title. Indent subordinates under a manager. If this doesn't exist, write "none".

__Who has the final say in content and copy decisions?__
> A person's name. If multiple people, separate names with ";".

__Who has the final say in design decisions?__
> A person's name. If multiple people, separate names with ";".

__Who has final say in technology and infrastructure decisions?__
> The person's name. If multiple people, separate names with ";".

__Do product owners frequently (at least once a month) meet with:__


- UX teams
- Dev teams

__Have your companies values, experiences, and goals been expressed to management and the client team?__


- Yes
- No

__Has this checklist been reviewed with the management, design and development teams?__


- Yes
- No



#### People like each other.

__Does the company have outings?__
> Examples: dinners / activities outside work.


- Yes
- No

__How often, in months, do employee reviews happen?__




### UX / UI

__How many designers on the project?__

#### Informed

__Is user testing done?__


- Yes
- No

__What user testing techniques are being used?__


- [ ] Usability testing
- [ ] User interviews
- [ ] Surveys

__Is analytic software being used?__


- Yes
- No

__Is AB testing being performed?__


- Yes
- No

__Are the results of user testing, analytics, and other data being discussed at least monthly?__


- Yes
- No


#### Quick Iterations

__How long, on average in weeks, between design changes and a user testing them?__

__Are design revisions factored into the estimate?__


- Yes
- No

__Are beta releases user tested?__


- Yes
- No

__Are prototypes and mockups user tested?__


- Yes
- No


#### Communication

__The following documents are created with the client:__


- [ ] Design guidelines / goals / statements
- [ ] Personas
- [ ] User stories or use cases.
- [ ] Competitive analysis

__The following documents are created:__


- [ ] Wireframes and mockups
- [ ] Storyboards
- [ ] Prototypes
- [ ] Prototypes
- [ ] High fidelity comps
- [ ] HTML prototypes
- [ ] HTML style guide

__Are videos or animations used to express interactions?__


- Yes
- No

__Are design issues and discussions "publicly" tracked?__


- Yes
- No

__Where are design issues and discussions tracked?:__


- [ ] Email
- [ ] Project management software (Trello, Basecamp)
- [ ] Issue tracker (Jira / github)
- [ ] Excel

__Does a design changelog exist?__
> A design changelog is a document that contains a list of changes to the mockup/prototypes.


- Yes
- No




### Development

> The following questions concern development specific problems.

#### Tools and Environment

> The essential tools are in place and being used in the right way.

__Source control is__


- [ ] Used
- [ ] Git
- [ ] Used with a branch and merge strategy.

__An issue tracker is__


- [ ] Used
- [ ] Integrated with source control.
- [ ] Used by non developers.

__The following environments exist__


- [ ] Development
- [ ] Test
- [ ] Staging
- [ ] Production

__Continuous integration__


- [ ] Exists
- [ ] Runs on all commits / pushes
- [ ] Emails on failure

__A 1-3 step process for the following exist:__


- [ ] Setting up a development environment
- [ ] Testing the application.
- [ ] Building the application into a production distributable.
- [ ] Deploy to test and staging.


#### Code quality

> Practices and patterns that ensure good code.

__Is a module loader used?__
> Examples: StealJS, RequireJS, Webpack, sprokets


- Yes
- No

__Is the high level architecture documented and followed?__
> For example: MVVM plus a client state observable with specified properties.


- Yes
- No

__All modules include:__


- [ ] High level documentation.
- [ ] Tests
- [ ] Inline documentation
- [ ] A demo

__Are there performance tests?__


- Yes
- No

__The service layer is:__


- [ ] RESTful
- [ ] Documented
- [ ] Tested
- [ ] Built / working

__Is technical debt measured?__
> Is some value (often in days / weeks) of technical debt calculated?


- Yes
- No

__Is technical debt factored into estimates?__
> Do estimations of time, or points, or effort include discussions of technical debt?


- Yes
- No


#### Team

> Does the development team work well together.

__Is there a QA team or resource?__


- Yes
- No

__Are teams grouped by specialty?__
> Example: client vs server


- Yes
- No

__How many front-end developers?__

__Do your work alongside the client's developers?__
> Your developers work on the same code as the client developers.


- Yes
- No

__Is every piece of code known to at least two people?__
> No piece of code should be "workable" by only one person.


- Yes
- No

__There are code reviews__


- [ ] Every commit
- [ ] Every week
- [ ] Every month
- [ ] Of new people's code
- [ ] Never

__List examples of the client demonstrating the ability to add or change to new technology as needed.__
> Examples: Adding memcache, moving to a cloud, setting up a CDN.

__List examples of needed changes in technology or process.__
> Examples: Adding memcache, moving to a cloud, setting up a CDN.





## Contributing

`questions.json` contains a list of questions. To change a question, add or modify the relevant section and submit a pull request. The following types are available:

 - `text` - A text field
 - `textarea` - A textarea field
 - `number` - A number input
 - `section` - Specifies a new section that can contain more questions
 - `single` - A list of potential answers in `values` only allowing to select one
 - `single` - A list of potential answers in `values` selecting multiple

