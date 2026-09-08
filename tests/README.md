# Account and submission browser regression

The test intercepts all Supabase requests in an isolated browser. It never registers real users, sends emails or writes to the live database.

Start the application on port 5180 with npm run dev -- --host 127.0.0.1 --port 5180 --strictPort, then run node tests/account-submission-flow.mjs.

Requires Playwright and local Chrome. Set PLAYWRIGHT_MODULE_PATH to an existing Playwright index.mjs if it is not installed in this checkout. The local app must have Supabase configured so the forms render; all backend traffic is mocked by the test.

Checks registration name metadata, personalized welcome, profile prefilling, inline editing, draft reload, no file upload on SAVE, required fields on SUBMIT, uploaded-file download, error handling, visible mobile forms and JavaScript errors. Screenshot outputs named *.local.png are local review artifacts and should not be committed.
