require('../../support/spec_helper');
require('../../support/configurations_shared_examples.js');

describe("Cucumber.Cli.Configuration", function() {
  var Cucumber = requireLib('cucumber');

  var argv, configuration, snippetLang;
  var argumentParser;
  var context = {};

  beforeEach(function() {
    argv                = createSpy("arguments (argv)");
    snippetLang         = createSpy("undefined snippet language"); 
    argumentParser      = createSpyWithStubs("argument parser", {parse: null, snippetLang: snippetLang});
    spyOn(Cucumber.Cli, 'ArgumentParser').andReturn(argumentParser);
    configuration       = Cucumber.Cli.Configuration(argv);
    context['configuration'] = configuration;
  });

  itBehavesLikeAllCucumberConfigurations(context);

  describe("constructor", function() {
    it("creates an argument parser", function() {
      expect(Cucumber.Cli.ArgumentParser).toHaveBeenCalledWith();
    });

    it("tells the argument parser to parse the arguments", function() {
      expect(argumentParser.parse).toHaveBeenCalledWith(argv);
    });
  });

  describe("getFeatureSources()", function() {
    var featureFilePaths, featureSourceLoader, featureSources;

    beforeEach(function() {
      featureFilePaths    = createSpy("feature file paths");
      featureSourceLoader = createSpy("feature source loader");
      featureSources      = createSpy("feature sources");
      spyOnStub(argumentParser, 'getFeatureFilePaths').andReturn(featureFilePaths);
      spyOnStub(featureSourceLoader, 'getSources').andReturn(featureSources);
      spyOn(Cucumber.Cli, 'FeatureSourceLoader').andReturn(featureSourceLoader);
    });

    it("gets the feature file paths", function() {
      configuration.getFeatureSources();
      expect(argumentParser.getFeatureFilePaths).toHaveBeenCalled();
    });

    it("creates a feature source loader for those paths", function() {
      configuration.getFeatureSources();
      expect(Cucumber.Cli.FeatureSourceLoader).toHaveBeenCalledWith(featureFilePaths);
    });

    it("gets the feature sources from the loader", function() {
      configuration.getFeatureSources();
      expect(featureSourceLoader.getSources).toHaveBeenCalled();
    });

    it("returns the feature sources", function() {
      expect(configuration.getFeatureSources()).toBe(featureSources);
    });
  });

  describe("getSupportCodeLibrary()", function() {
    var supportCodeFilePaths, supportCodeLoader, supportCodeLibrary;

    beforeEach(function() {
      supportCodeFilePaths = createSpy("support code file paths");
      supportCodeLoader    = createSpy("support code loader");
      supportCodeLibrary   = createSpy("support code library");
      spyOnStub(argumentParser, 'getSupportCodeFilePaths').andReturn(supportCodeFilePaths);
      spyOn(Cucumber.Cli, 'SupportCodeLoader').andReturn(supportCodeLoader);
      spyOnStub(supportCodeLoader, 'getSupportCodeLibrary').andReturn(supportCodeLibrary);
    });

    it("gets the support code file paths", function() {
      configuration.getSupportCodeLibrary();
      expect(argumentParser.getSupportCodeFilePaths).toHaveBeenCalled();
    });

    it("creates a support code loader for those paths", function() {
      configuration.getSupportCodeLibrary();
      expect(Cucumber.Cli.SupportCodeLoader).toHaveBeenCalledWith(supportCodeFilePaths);
    });

    it("gets the support code library from the support code loader", function() {
      configuration.getSupportCodeLibrary();
      expect(supportCodeLoader.getSupportCodeLibrary).toHaveBeenCalled();
    });

    it("returns the support code library", function() {
      expect(configuration.getSupportCodeLibrary()).toBe(supportCodeLibrary);
    });
  });

  describe("isHelpRequired()", function() {
    beforeEach(function() {
      spyOnStub(argumentParser, 'isHelpRequested');
    });

    it("asks the argument parser wether the help was requested or not", function() {
      configuration.isHelpRequested();
      expect(argumentParser.isHelpRequested).toHaveBeenCalled();
    });

    it("returns the answer from the argument parser", function() {
      var isHelpRequested = createSpy("is help requested?");
      argumentParser.isHelpRequested.andReturn(isHelpRequested);
      expect(configuration.isHelpRequested()).toBe(isHelpRequested);
    });
  });

  describe("isVersionRequired()", function() {
    beforeEach(function() {
      spyOnStub(argumentParser, 'isVersionRequested');
    });

    it("asks the argument parser wether the version was requested or not", function() {
      configuration.isVersionRequested();
      expect(argumentParser.isVersionRequested).toHaveBeenCalled();
    });

    it("returns the answer from the argument parser", function() {
      var isVersionRequested = createSpy("is version requested?");
      argumentParser.isVersionRequested.andReturn(isVersionRequested);
      expect(configuration.isVersionRequested()).toBe(isVersionRequested);
    });
  });
});
