**Full control over SFCC form templates by rendering them using XSLT.**

How to use:
- clone repo
- run "npm install"
- run "gulp watch" and observe new form definition XML files that appeared inside "cartridges/cartridge_name/cartridge/forms" directory.

Example from real project: bunch of form schema XMLs with inline definitions for "phone prefix" field:
```xml
<field formid="phoneprefix" label="profile.phoneprefix" type="string" mandatory="true" max-length="5" binding="phoneprefix">
    <!--call included template to be rendered here-->
    <option optionid='us' value='+1' label='country.us.code'/>
    <option optionid='ru' value='+7' label='country.ru.code'/>
    <option optionid='eg' value='+20' label='country.eg.code'/>
</field>
```
Inline definitions is not DRY but they are presumably legacy and somewhat acceptable.
Now imagine that the client makes a CR for "phone prefix" field to have prefixes for all existing countries.
You have 2 refactoring options here:
- change each inline include to have ~200 options: this remains not DRY and becomes unacceptable IMO;
- extract "phone prefix" field into a separate form (formid="phonePrefix" for example) and make an include of this form for each corresponding
"phone prefix" field, ie:
```xml
<include formid="phone1prefix" name="phoneprefix"/>
...
<include formid="phone2prefix" name="phoneprefix"/>
etc
```
While this looks good and DRY this produces an impediment: you should also refactor ALL controllers that references to "phone prefix" field
because the signature of the field will change from "form.phoneprefix" to "oneForm.phone1prefix.phoneprefix", "anotherForm.phone2prefix.phoneprefix" etc.
And it may cause a lot of regression in project.

What is proposed here is to add a layer of abstraction and use the power of XSLT to give full control over how form XML schemas are generated.
XSLT is production-tested with years and by far is the most elaborate technology for tree data transforming.

The basic idea is to add "src" directory to "cartridge/forms" with a sub-directories for each locale.
Also create a "components" dir inside "src" for common/reusable templates Then perform an XSLT transformation on files from each "src/some_locale" source templates every time something changes.

**PROS**: flexibility, independence from SFCC implementation. Another huge benefit is error reporting: if you made a syntax mistake in form definition
 you'll get absolutely no error logs from SFSS(correct me if I'm wrong, good IDE should show errors though), your instance will just "magically" stop working, while using this tool you'll get good, descriptive error messages on the build step.

**CONS**: XSLT overhead.

**Conclusion**: IMO for medium/large projects PROS > CONS because project-wide controllers refactoring is a big risk.