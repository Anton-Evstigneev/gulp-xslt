<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="2.0">
    <xsl:output encoding="utf-8" indent="yes"/>

    <!--ALL includes goes here-->
    <xsl:include href="../components/phoneprefixoptions.xsl"/>

    <xsl:template match="/">
        <form xmlns="http://www.demandware.com/xml/form/2008-04-19" secure="false">
            <field formid="firstname" label="profile.firstname" type="string" mandatory="true" max-length="50" binding="firstName" />
            <field formid="phoneprefix" label="profile.phoneprefix" type="string" mandatory="true" max-length="5" binding="phoneprefix">
                <!--call included template to be rendered here-->
                <xsl:call-template name="phonePrefixOptions" />
            </field>
        </form>
    </xsl:template>
</xsl:stylesheet>