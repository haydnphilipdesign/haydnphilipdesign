import os

image_dimensions = {
    "graphic1.jpg": (1417, 500),
    "graphic2.jpg": (1417, 500),
    "graphic3.jpg": (1417, 500),
    "graphic4.jpg": (1417, 500),
    "graphic5.jpg": (1417, 500),
    "graphic6.jpg": (1417, 500),
    "graphic7.jpg": (890, 500),
    "graphic8.jpg": (889, 500),
    "graphic9.jpg": (708, 500),
    "graphic10.jpg": (694, 500),
    "graphic11.jpg": (689, 500),
    "graphic12.jpg": (597, 500),
    "graphic13.jpg": (572, 500),
    "graphic14.jpg": (546, 500),
    "graphic15.jpg": (500, 500),
    "graphic16.jpg": (500, 500),
    "graphic17.jpg": (500, 500),
    "graphic18.jpg": (500, 500),
    "graphic19.jpg": (386, 500),
    "graphic20.jpg": (386, 500),
    "graphic21.jpg": (353, 500),
    "graphic22.jpg": (353, 500),
    "photo1.jpg": (948, 500),
    "photo2.jpg": (889, 500),
    "photo3.jpg": (750, 500),
    "photo4.jpg": (667, 500),
    "photo5.jpg": (505, 500),
    "photo6.jpg": (499, 500),
    "photo7.jpg": (376, 500),
    "photo8.jpg": (333, 500)
}

def generate_html(section_name, num_images, image_prefix):
    html = f"""
    <div id="{section_name}">
        <h3>{section_name.title()}</h3>
        <div class="my-gallery" itemscope itemtype="http://schema.org/ImageGallery">
    """

    for i in range(1, num_images + 1):
        image_filename = f"{section_name}{i}.jpg"
        image_path = os.path.join("C:\\Users\\Admin\\Documents\\haydnphilipdesign\\assets\\images\\portfolio", image_filename)

        try:
            width, height = image_dimensions[image_filename]
            data_size = f"{width}x{height}"
        except KeyError:
            print(f"Image dimensions not found for {image_filename}")
            data_size = "unknown"

        html += f"""
            <figure itemprop="associatedMedia" itemscope itemtype="http://schema.org/ImageObject">
                <a href="{image_path}" itemprop="contentUrl" data-size="{data_size}">
                    <img src="{image_path}" itemprop="thumbnail" alt="{section_name} {i}" />
                </a>
                <figcaption itemprop="caption description">{section_name} {i}</figcaption>
            </figure>
        """

    html += """
        </div>
    </div>
    """

    return html

# Example usage:
graphic_design_html = generate_html('graphic', 22, 'assets/images/portfolio/')
photography_html = generate_html('photo', 8, 'assets/images/portfolio/')
website_html = generate_html('websites', 3, 'assets/images/portfolio/')

portfolio_html = f"""
<section id="portfolio">
    <div class="container">
        <h2>My Portfolio</h2>
        <div class="portfolio-categories">
            {graphic_design_html}
            {photography_html}
            {website_html}
        </div>
    </div>
</section>
"""

print(portfolio_html)
