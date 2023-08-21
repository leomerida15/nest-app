export const confirTemplate = ({ email, url }: { email: string; url: string }) => {
	return /*html*/ `<html>
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Raleway:wght@100&display=swap" rel="stylesheet">
    <body style="background-color: #a1a1a1;padding: 30px">
        <div style="max-width: 600px; margin: 0 auto; background-color: #fff; font: 14px sans-serif; border-top: 4px solid #00fb72">
            <!--  -->
            <div style="border-bottom: 1px solid #f2f3f5; padding: 2px 10px;background-color: #000">
                <div style="background-color: #000">
                    <img src="https://i.ibb.co/FJS3JBG/Dimas-removebg.webp" width="284" border="0" class="" style="display: block; width: 100%;">
                </div>
            </div>
            <div style="background-color: #fff; padding: 0px 30px">
                <div style="border-bottom: 1px solid #f2f3f5">
                    <h2>Hello ${email}</h2>
                    <p style="font-size: 14px; outline: 0; text-align: justify;font-family: 'Roboto', sans-serif">
                        Make click in the button to confirmation your email
                    </p>
                </div>
                <p style="font-size: 14px; outline: 0; text-align: justify;font-family: 'Roboto', sans-serif">
                    <br />
                    <br />
                    <br />

                </p>
                <br />
                <div style="text-align: center; border-bottom: 1px solid #f2f3f5; margin-top: 0px;font-family: 'Roboto', sans-serif">
                    <a
                        style="
                            text-decoration: none;
                            border: none;
                            border-radius: 6pt;
                            display: inline-block;
                            height: 36px;
                            line-height: 36px;
                            padding: 0 65px;
                            vertical-align: middle;
                            -webkit-tap-highlight-color: transparent;
                            background-color: #6fb060;
                            color: white;
                            outline: 0;
                            font-family: 'Roboto', sans-serif;
                            margin-bottom: 1rem;
                        "
                        href="${url}"
                    >
                        Click Me!
                    </a>
                    <br />
                </div>
                <br />
                <br />
            </div>
        </div>
        <div style="max-width: 600px; margin: 0 auto;font: 14px sans-serif">
            <p style="font-size: 14px; outline: 0; text-align: justify;font-family: 'Roboto', sans-serif">
                Dimas Merida Developer
            </p>
        </div>
    </body>
</html>`;
};
