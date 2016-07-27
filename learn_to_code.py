from flask import Flask, render_template, request
import requests 

app = Flask("MyApp")

MAILGUN_DOMAIN = "sandbox69bd6b7fabef4c07875963a7013e6db4.mailgun.org"
MAILGUN_API_KEY = "key-7afaabe46e6598ce8e19a09ff16a0b4b"

"""Contact US Email"""
def contact_us_message(to, first_name, msg):
    return requests.post(
        "https://api.mailgun.net/v3/%s/messages" % MAILGUN_DOMAIN, 
        auth=("api", MAILGUN_API_KEY),
        files = [("attachment", open("attachments/example.txt")), ("inline", open("static/img/favicon2.png"))],
        data={
            "from": "Learn To Code <mailgun@%s>" % MAILGUN_DOMAIN,
            "to": to,
            "subject": "Thank you for contacting us!",
            "text": "Hi %s!" % first_name.split(' ').pop(0),
            'html': '<html>Hi %s! <strong>Thank you</strong> for contacting us. Someone will be back to you within 24 hours. In the meantime, why not check out our blog posts, coding resources or quiz for your coding essentials. <br /> Your message: <br /> %s <br /><br /> <img src="cid:favicon2.png"> </html>' % (first_name.split(' ').pop(0) , msg)
        })

"""Contact Us - Add to mail list"""        
def contact_message(to, first_name, last_name, tel, msg):
    return requests.post(
        "https://api.mailgun.net/v3/lists/contact-us-learntocode@%s/members" % MAILGUN_DOMAIN,
        auth=('api', MAILGUN_API_KEY),
        data={'subscribed': True,
              'address': to,
              'name': first_name + ' ' + last_name,
              'description': 'Contact Us Message',
              'vars': '{"telephone": "%s" , "comment": "%s"}' % (tel, msg)})

"""Newsletter Subscription Email from contact form"""
def subscription_message_contact(to, first_name):
    return requests.post(
        "https://api.mailgun.net/v3/%s/messages" % MAILGUN_DOMAIN, 
        auth=("api", MAILGUN_API_KEY),
        files = [("attachment", open("attachments/example.txt")), ("inline", open("static/img/favicon2.png"))],
        data={
            "from": "Learn To Code <mailgun@%s>" % MAILGUN_DOMAIN,
            "to": to,
            "subject": "Welcome %s!" % first_name.split(' ').pop(0),
            "text": "Hi %s!" % first_name.split(' ').pop(0),
            'html': '<html> Hi <strong>%s</strong>!. Thank you for subscribing to our newsletter. <br /> <br /> <img src="cid:favicon2.png">. <br /> <br /> If you wish to unsubscribe, click here.</html>' % first_name.split(' ').pop(0)
        })

"""Newsletter Subscription from contact form - Add to mail list"""
def add_list_member_contact(to, first_name, last_name, tel):
    return requests.post(
        "https://api.mailgun.net/v3/lists/newsletter-learntocode@%s/members" % MAILGUN_DOMAIN,
        auth=('api', MAILGUN_API_KEY),
        data={'subscribed': True,
              'address': to,
              'name': first_name + ' ' + last_name,
              'description': 'Newsletter Subscriber',
              'vars': '{"telephone": "%s"}' % tel})
             



"""Newsletter Subscription Email"""
def subscription_message(to, full_name):
    return requests.post(
        "https://api.mailgun.net/v3/%s/messages" % MAILGUN_DOMAIN, 
        auth=("api", MAILGUN_API_KEY),
        files = [("attachment", open("attachments/example.txt")), ("inline", open("static/img/favicon2.png"))],
        data={
            "from": "Learn To Code <mailgun@%s>" % MAILGUN_DOMAIN,
            "to": to,
            "subject": "Welcome %s!" % full_name.split(' ').pop(0),
            "text": "Hi %s!" % full_name.split(' ').pop(0),
            'html': '<html> Hi %s! <strong>content</strong>. Thank you for subscribing to our newsletter. <br /> <br /> <img src="cid:favicon2.png">. <br /> If you wish to unsubscribe, click </html>' % full_name.split(' ').pop(0)
        })

"""Newsletter Subscription - Add to mail list"""
def add_list_member(to, full_name):
    return requests.post(
        "https://api.mailgun.net/v3/lists/newsletter-learntocode@%s/members" % MAILGUN_DOMAIN,
        auth=('api', MAILGUN_API_KEY),
        data={'subscribed': True,
              'address': to,
              'name': full_name,
              'description': 'Newsletter Subscriber'})
             
            
@app.route("/")
def home():
    return render_template("index.html")

@app.route("/index.html")
def home2():
    return render_template("index.html")

@app.route("/about.html")
def about():
    return render_template("about.html")
    
@app.route("/thank-you.html")
def thank_you():
    return render_template("thank-you.html")

@app.route("/newsletter-sub.html")
def thank_you_news():
    return render_template("newsletter-sub.html")
    
@app.route("/blog.html")
def blog():
    return render_template("blog.html")
    
@app.route("/resources.html")
def resources():
    return render_template("resources.html")

@app.route("/resources-python.html")
def resources_python():
    return render_template("resources-python.html")

@app.route("/resources-ruby.html")
def resources_ruby():
    return render_template("resources-ruby.html")

@app.route("/resources-sql.html")
def resources_sql():
    return render_template("resources-sql.html")
    
@app.route("/resources-java.html")
def resources_java():
    return render_template("resources-java.html")

@app.route("/resources-html-css.html")
def resources_html_css():
    return render_template("resources-html-css.html")

@app.route("/resources-c.html")
def resources_c():
    return render_template("resources-c.html")

@app.route("/quiz.html")
def quiz():
    return render_template("quiz.html")

@app.route("/terms.html")
def terms():
    return render_template("terms.html")

@app.route("/privacy-policy.html")
def privacy():
    return render_template("privacy-policy.html")
    
@app.route("/sitemap.html")
def sitemap():
    return render_template("sitemap.html")


    
@app.route("/thank-you.html", methods=['GET', 'POST'])
def contact_msg():
    form_data = request.form
    first_name = request.form.get('fname')
    last_name = request.form.get('lname')
    to = request.form.get('email')
    tel = request.form.get('tel')
    msg = request.form.get('comments')
    contact_us_message(to, first_name, msg)
    contact_message(to, first_name, last_name, tel, msg)
    if request.form.get('sub'):
        subscription_message_contact(to, first_name)
        add_list_member_contact(to, first_name, last_name, tel)
    return render_template("thank-you.html")

@app.route("/newsletter-sub.html", methods=['GET', 'POST'])
def sign_up():
    form_data = request.form
    full_name = request.form.get('fname')
    to = request.form.get('email')
    subscription_message(to, full_name)
    add_list_member(to, full_name)
    return render_template("newsletter-sub.html")

app.run()
