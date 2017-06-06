'use strict'

const path = require('path')
const chai = require('chai')
const expect = chai.expect

const SIMPLE_APP = path.join(__dirname, 'fixtures', 'simple-app')
const app = require(path.join(SIMPLE_APP, 'server/server.js'))
const Meta = app.models.Meta

describe('Component test', function() {
  describe('Expected usage', function() {

    it('should have a Meta model', function(done) {
      expect(Meta).to.be.a('function')
      done()
    })

    it('should find all defined models', function() {
      return Meta.getModels()
        .then((res) => {
          expect(res).to.be.an('array')
          expect(res.length).to.equal(9)
        })
    })

    it('should find models details', function() {
      return Meta.getModelById('Category')
        .then((res) => {
          expect(res).to.be.an('object')
          expect(res.acls).to.be.an('array')
          expect(res.mixins).to.be.an('object')
          expect(res.properties).to.be.an('object')
          expect(res.properties.id).to.deep.equal({
            id: 1,
            type: 'Number',
            generated: true,
          })
          expect(res.properties.name).to.deep.equal({
            type: 'String',
            required: true,
          })
          expect(res.properties.created).to.deep.equal({
            type: 'Date',
            description: 'Created date.',
            defaultFn: 'now',
          })
          expect(res.properties.modified).to.deep.equal({
            type: 'Date',
            description: 'Modified date.',
            defaultFn: 'now',
          })
          expect(res.relations).to.be.an('object')
          expect(res.validations).to.be.an('array')
        })
    })

  })
})
