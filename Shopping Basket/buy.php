<html>
    <head><title>Buy Products</title></head>
    <body>


        <?php
        error_reporting(E_ALL);
        ini_set('display_errors', 'On');
        session_start();
//        $xmlstr = file_get_contents('http://sandbox.api.ebaycommercenetwork.com/publisher/3.0/rest/GeneralSearch?apiKey=???&categoryId=72&showAllDescendants=true');
//        $xml = new SimpleXMLElement($xmlstr);
        showBasket();
        printSearchForm();
        searchResults();

        function showBasket() {

            print("Shopping Basket <table border=1>");
            if (isset($_GET['clear'])) {
                session_destroy();
                unset($_SESSION['basket']);
            }

            if (isset($_GET['delete']) && isset($_SESSION['basket']) && count($_SESSION['basket']) > 0) {
                     $val = str_replace("'", "", $_GET['delete']);
unset($_SESSION['basket'][$val]);
              
            }

            if (!isset($_SESSION['basket'])) {
                $_SESSION['basket'] = array();
            }
            if (isset($_GET['buy'])) {
                $productID = str_replace("'", "", $_GET['buy']);

                $_SESSION['basket'][$productID] = $productID;
            }

            foreach ($_SESSION['basket'] as $item) {
                $xmlstr = file_get_contents('http://sandbox.api.ebaycommercenetwork.com/publisher/3.0/rest/GeneralSearch?apiKey=????&trackingId=???&productId=' .$item);
                $xml = new SimpleXMLElement($xmlstr);

                $offer = $xml->categories->category->items->product;

                print("<tr><td><img src='" . (string) $offer->images->image->sourceURL . "'></td>"
                        . "<td>'$offer->name'</td><td>$'$offer->minPrice'</td>"
                        . "<td><a href=buy.php?delete='$item'>delete</a></td></tr>");
            }


            print("</table>");
            print('<form action="buy.php" method="GET"> <input name="clear" value="1" type="hidden"><input value="Clear Basket" type="submit"></form>');
        }

        function searchResults() {
            if (isset($_GET['search']) && isset($_GET['category'])) {
                $keyword = $_GET['search'];
                $cat = $_GET['category'];
                $xmlstr = file_get_contents('http://sandbox.api.ebaycommercenetwork.com/publisher/3.0/rest/GeneralSearch?apiKey=???&trackingId=???&keyword=' . $keyword . '&categoryId=' . $cat);
                $xml = new SimpleXMLElement($xmlstr);



                print("<table border=1>");
                print("<tr><th>Image</th><th>Name</th><th>Price</th><th>Description</th><th>Link</th></tr>");
                foreach ($xml->categories->category->items->product as $offer) {
                    $offerdesc = $offer->fullDescription;
                    $offerurl = $offer->productOffersURL;
                    $offerid = (int) $offer['id'];
                    print("<tr><td><a href=buy.php?buy='" . $offerid . "'><img src='" . (string) $offer->images->image->sourceURL . "'></a></td>"
                            . "<td>'$offer->name'</td><td>$'$offer->minPrice'</td>"
                            . "<td>" . $offerdesc . "</td>"
                            . "<td><a href='" . $offerurl . "'>Link</a></td></tr>");
                }
            }
        }

        function printSearchForm() {
            print("<form action='buy.php' method='GET'> <fieldset><legend>Find products:</legend>");
            print("<label>Category:");

            $xmlCatStr = file_get_contents('http://sandbox.api.ebaycommercenetwork.com/publisher/3.0/rest/CategoryTree?apiKey=78b0db8a-0ee1-4939-a2f9-d3cd95ec0fcc&trackingId=7000610&categoryId=72&showAllDescendants=true');
            $xmlcat = new SimpleXMLElement($xmlCatStr);
            $category = $xmlcat->category;
            print("<select name='category'><option value=" . $category['id'] . ">$category->name</option>");

            $subcategories = $category->categories->category;
            if (isset($subcategories)) {
                foreach ($subcategories as $subcat) {
                    print("<option value=" . $subcat['id'] . ">$subcat->name</option>");

                    $subsubcategories = $subcat->categories->category;
                    if (isset($subsubcategories)) {
                        print("<optgroup label='$subcat->name'>");
                        foreach ($subsubcategories as $subsubcat) {
                            print("<option value=" . $subsubcat['id'] . ">$subsubcat->name</option>");
                        }
                    }
                    print("</optgroup>");
                }
            }
            print("</select></label><label>Search <input type='text' name ='search' /></label><input type='Submit' name='submit' value='search'></fieldset></form>");
        }
        ?>
    </body>
</html>
