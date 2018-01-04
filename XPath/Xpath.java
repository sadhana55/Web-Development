package xpath;

import javax.xml.xpath.*;
import org.xml.sax.InputSource;
import org.w3c.dom.*;

class XPATH {

    static void print ( Node e ) {
	if (e instanceof Text)
	    System.out.print(((Text) e).getData());
	else {
	    NodeList c = e.getChildNodes();
	    System.out.print("<"+e.getNodeName());
	    NamedNodeMap attributes = e.getAttributes();
	    for (int i = 0; i < attributes.getLength(); i++)
		System.out.print(" "+attributes.item(i).getNodeName()
				 +"=\""+attributes.item(i).getNodeValue()+"\"");
	    System.out.print(">");
	    for (int k = 0; k < c.getLength(); k++)
		print(c.item(k));
	    System.out.print("</"+e.getNodeName()+">");
            System.out.println();
	}
    }

    static void eval ( String query, String document ) throws Exception {
	XPathFactory xpathFactory = XPathFactory.newInstance();
	XPath xpath = xpathFactory.newXPath();
	InputSource inputSource = new InputSource(document);
	NodeList result = (NodeList) xpath.evaluate(query,inputSource,XPathConstants.NODESET);
	System.out.println("XPath query: "+query);
        
	for (int i = 0; i < result.getLength(); i++)
	    print(result.item(i));
            System.out.println();
    }

    public static void main ( String[] args ) throws Exception {
        System.out.println("1. Print the titles of all articles whose one of the authors is David Maier.");
	eval("/SigmodRecord/issue/articles/article [authors/author='David Maier']/title","SigmodRecord.xml");
        System.out.println("\n");
        System.out.println("2. Print the titles of all articles whose first author is David Maier.");
    	eval("/SigmodRecord/issue/articles/article [authors/author[@position='01']='David Rozenshtein']/title","SigmodRecord.xml");
        System.out.println("\n");
        System.out.println("3. Print the titles of all articles whose authors include David Maier and Stanley B. Zdonik");
        eval("/SigmodRecord/issue/articles/article [authors/author='David Maier' and authors/author='Stanley B. Zdonik']/title","SigmodRecord.xml");
        System.out.println("\n");
        System.out.println("4. Print the titles of all articles in volume 19/number 2");
        eval("/SigmodRecord/issue[volume = '13' and number= '3']/articles/article/title","SigmodRecord.xml");
        System.out.println("\n");
        System.out.println("5. Print the titles and the init/end pages of all articles in volume 19/number 2 whose authors include Jim Gray.");
        eval("/SigmodRecord/issue[volume = '13' and number= '4']/articles/article[authors/author='Jim Gray']/title | /SigmodRecord/issue[volume = '13' and number= '4']/articles/article[authors/author='Jim Gray']/initPage |/SigmodRecord/issue[volume = '13' and number= '4']/articles/article[authors/author='Jim Gray']/endPage","SigmodRecord.xml");
        System.out.println("\n");
        System.out.println("6. Print the volume and number of all articles whose authors include David Maier.");        
        eval("/SigmodRecord/issue[articles/article[authors/author='David Maier']]/volume | /SigmodRecord/issue[articles/article[authors/author='David Maier']]/number","SigmodRecord.xml");
    }
}
