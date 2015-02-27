describe("MongoOverflow homepage", function() {
    it("should have a title", function() {
        browser.get("http://localhost:7070");

        expect(browser.getTitle()).toEqual("Mongo Overflow");
    });
});