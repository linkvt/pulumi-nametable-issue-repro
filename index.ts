import * as pulumi from "@pulumi/pulumi";

/**
 * e.g. a generic cloud provider component like an S3 Bucket.
 * Using a local one here as it is enough for this repro.
 */
class GenericComponent extends pulumi.ComponentResource {
  constructor(name: string, opts?: pulumi.ComponentResourceOptions) {
    super("dummy-component", name, {}, opts);
  }
}

/**
 * e.g. a component for an s3 bucket configured with defaults for encryption etc.
 */
class ParentComponent1 extends pulumi.ComponentResource {
  constructor(name: string, parentOnly: boolean) {
    super("component1", name);

    if (!parentOnly) {
      new GenericComponent(`${name}-bucket-1`, { parent: this });
    }
  }
}

/**
 * e.g. a component for a database cluster containing many database related resources
 */
class ParentComponent2 extends pulumi.ComponentResource {
  constructor(name: string, parentOnly: boolean) {
    super("component2", name);

    if (!parentOnly) {
      new GenericComponent(`${name}-bucket-2`, { parent: this });
    }
  }
}

const commonName = "test";

/*
 * If you are using the preconfigured backend I checked in to this repo you can just run `pulumi preview --import-file import.json` to generate the bad import file.
 *
 * Reproduction with your own or a new backend:
 * 1. set this to true in the first run to only create the parent components
 * 2. set this to false to now create the child components into the existing parent components
 */
const createOnlyParent = false;

new ParentComponent1(commonName, createOnlyParent);
new ParentComponent2(commonName, createOnlyParent);
