<xsl:stylesheet version="2.0"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:template match="/">
    <html xmlns="http://www.w3.org/1999/xhtml">
      <body>
			<h3>Sadhana Singh</h3>		
            <h1 style="color:Red;">
                <xsl:value-of select="/collection/description"/>
            </h1>		
            <xsl:for-each select="/collection/recipe">		
				<h4 style="color:blue;">Recipe Id: <xsl:value-of select="@id"/> </h4>			
                <h2 style="color:blue;">Recipe Name: <xsl:value-of select="title"/> </h2>
                <h3>Date: <xsl:value-of select="date"/>	</h3>
				<table>				
				<tr>					
					<h3>Ingredients:</h3>	
							<table border="1">
								<tr bgcolor="#9acd32">
								  <th>Name</th>
								  <th>Amount</th>
								  <th>Unit</th>
								</tr> 
							
								<xsl:for-each select="ingredient"> 
									<tr>
										<td><xsl:value-of select="@name"/></td>
										<td><xsl:value-of select="@amount"/></td>
										<td><xsl:value-of select="@unit"/></td>	
									</tr>
									<xsl:for-each select="ingredient">
										<tr>
											<td><xsl:value-of select="@name"/></td>
											<td><xsl:value-of select="@amount"/></td>
											<td><xsl:value-of select="@unit"/></td>							
										</tr>									
										<xsl:for-each select="ingredient">
											<tr>
												<td><xsl:value-of select="@name"/></td>
												<td><xsl:value-of select="@amount"/></td>
												<td><xsl:value-of select="@unit"/></td>							
											</tr>
											<xsl:for-each select="ingredient">
											<tr>
												<td><xsl:value-of select="@name"/></td>
												<td><xsl:value-of select="@amount"/></td>
												<td><xsl:value-of select="@unit"/></td>							
											</tr>
											</xsl:for-each>	
										</xsl:for-each>		
									</xsl:for-each>
								</xsl:for-each>	
							</table>	
					</tr>			
				</table>			
				<table>				
					<xsl:for-each select="ingredient"> 						
							<xsl:for-each select="preparation">	<h4>
								<xsl:value-of select="../@name"/></h4>
								<xsl:for-each select="step">					
									<ul><li>Step: <xsl:value-of select="text()"/>	</li></ul>
								</xsl:for-each>
							</xsl:for-each>
					</xsl:for-each>					
				</table>
				
				<table>				
					<xsl:for-each select="ingredient"> 
						<xsl:for-each select="ingredient">
							<xsl:for-each select="preparation">	<h4>
								<xsl:value-of select="../@name"/></h4>
								<xsl:for-each select="step">					
									<ul><li>Step: <xsl:value-of select="text()"/>	</li></ul>
								</xsl:for-each>
							</xsl:for-each>
						</xsl:for-each>	
					</xsl:for-each>					
				</table>
				<table>				
					<xsl:for-each select="ingredient"> 
						<xsl:for-each select="ingredient">
							<xsl:for-each select="ingredient">
								<xsl:for-each select="preparation">	<h4>
									<xsl:value-of select="../@name"/></h4>
									<xsl:for-each select="step">					
										<ul><li>Step: <xsl:value-of select="text()"/>	</li></ul>
									</xsl:for-each>
								</xsl:for-each>
							</xsl:for-each>
						</xsl:for-each>	
					</xsl:for-each>					
				</table>
				<h3>Main Preparation:</h3>
				<xsl:for-each select="preparation">	
					<xsl:for-each select="step">					
						<ul><li>Step: <xsl:value-of select="text()"/>	</li></ul>
					</xsl:for-each>
				</xsl:for-each>
				<h3>Comments: <xsl:value-of select="comment"/>	</h3>
				<h3>Nutrition: </h3>
					<table border="1">
						<tr bgcolor="#9acd32">
						  <th>Calories</th>
						  <th>Fat</th>
						  <th>Carbohydrates</th>
						  <th>Protein</th>
						  <th>Alcohol</th>
						</tr> 
						<xsl:for-each select="nutrition">														
							<tr>
								<td><xsl:value-of select="@calories"/></td>
								<td><xsl:value-of select="@fat"/></td>
								<td><xsl:value-of select="@carbohydrates"/></td>	
								<td><xsl:value-of select="@protein"/></td>	
								<td><xsl:value-of select="@alcohol"/></td>
							</tr>					
						</xsl:for-each>						
					</table>
				<h3>Related: <xsl:value-of select="related"/>	</h3>
			</xsl:for-each>	
				
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>

