# ffxiv-organizer-items-api

## QuickStart

This service is part of 9 components connected over a Docker network. It is possible to run without docker but will require manual setup of mongodb and pointing services to eache other correctly. 

````
sh deploy/deploy.sh {env}
````

### Cleanup before commits

````
sh deploy/reset.sh {env}
````

# Software Development Lifecycle

Step-by-step instructions of the convention used to make any changes to code and the release process

1. Create a branch from the Master branch using the following naming convention: 
````
feature/description-of-feature
change/description-of-change
bug/description-of-bug
````
2. If applicable: write unit tests to cover the work described

3. Do the work described

4. Make sure all unit tests pass

5. Bump version in package.json using the Semantic Versioning convention with -SNAPSHOT on the end.

6. Commit and push changes to Repository

7. Create a Pull Request from your branch into Develop

8. Merge the Pull Request (This will trigger the Jenkins build on the QA environment)

9. Run the UI and integration tests against QA to ensure no regression

10. If applicable: create new UI and/or integration tests to cover new code and run to ensure it is working as expected (for changes made to the UI/Integration tests repositories use the same branch name as the change merged into Develop)

11. If applicable: perform manual tests to verify changes

12. Create a branch from Develop using the following naming convention (keep description same as first branch)

````
release/feature/description-of-feature
release/change/description-of-change
release/bug/description-of-bug
````
13. Remove -SNAPSHOT from version in package.json

14. Commit and push changes to Repository

15. Create a Pull Request from your branch into Master

16. Merge the Pull Request (This will trigger the Jenkins build on the Production environment)

17. Verify changes in Production are working as expected
