import { assert } from 'chai'

import { getClient } from "../test-helper"
import { Person } from '@microsoft/microsoft-graph-types'

declare const describe, it;

describe('Social and Insights', function () {
  this.timeout(10 * 1000);
  it('Fetch a list of people', function () {
    return getClient().api("/me/people").get().then((json) => {
      const person = json.value[0] as Person;
      assert.isDefined(person.displayName);
      assert.isDefined(person.surname);
      assert.isDefined(person.id);

      assert.isUndefined(person['invalidPropertyName']);
      return Promise.resolve();
    });
  });

  it('Searches the people list', function () {
    return getClient()
      .api("/me/people")
      .query("$search=j")
      .get()
  });

  it('Searches the people list with a topic', function () {
    return getClient()
      .api("/me/people")
      .query(`$search="topic: planning"`)
      .get()
  });


  it('Finds items trending around me', function () {
    return getClient()
      .api("/me/insights/trending")
      .version("beta")
      .get()
  });

});
