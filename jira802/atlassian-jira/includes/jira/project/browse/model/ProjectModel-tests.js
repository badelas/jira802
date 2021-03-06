AJS.test.require("jira.webresources:browseprojects", function () {
    require(["jira/project/browse/projectcollection", "jira/project/browse/projecttypesservice"], function (ProjectCollection, ProjectTypesService) {
        "use strict";

        module("jira/project/browse/projectmodel", {
            setup: function setup() {
                this.firstCat = {
                    get: sinon.stub().withArgs("name").returns("first category")
                };

                this.secondCat = {
                    get: sinon.stub().withArgs("name").returns("second category")
                };

                var catGetter = sinon.stub();
                catGetter.withArgs("first").returns(this.firstCat);
                catGetter.withArgs("second").returns(this.secondCat);

                this.catCollection = {
                    get: catGetter
                };

                this.projects = [{ id: "proj1", projectCategoryId: "first" }, { id: "proj2", projectCategoryId: "second" }, { id: "proj3", projectCategoryId: "third" }, { id: "proj4" }];

                this.collection = new ProjectCollection(this.projects, {
                    categories: this.catCollection,
                    mode: "client"
                });
            },

            assertProjectCategoryIsCorrect: function assertProjectCategoryIsCorrect(projectId, expectedCategoryId, expectedCategoryName) {
                var project = this.collection.get(projectId);
                ok(project);
                var projectJson = project.toJSON();
                equal(projectJson.projectCategoryId, expectedCategoryId);
                equal(projectJson.projectCategoryName, expectedCategoryName);
            }
        });

        test("should provide category name for known categories", function () {
            this.assertProjectCategoryIsCorrect("proj1", "first", "first category");
            this.assertProjectCategoryIsCorrect("proj2", "second", "second category");
        });

        test("should not include unknown categories", function () {
            this.assertProjectCategoryIsCorrect("proj3", "third", undefined);
            this.assertProjectCategoryIsCorrect("proj4", undefined, undefined);
        });

        test("should not include category when out of collection", function () {
            var project = new this.collection.model({ id: "project", projectCategoryId: "first" }).toJSON();

            equal(project.projectCategoryId, "first");
            equal(project.projectCategoryName, undefined);
        });

        test("should add the project type icon to the model", function () {
            ProjectTypesService.init({ business: { icon: "business-icon" } });

            var project = new this.collection.model({ projectTypeKey: "business" }).toJSON();

            equal(project.projectTypeIcon, "business-icon");
        });
    });
});