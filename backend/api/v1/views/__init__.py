from flask import Blueprint
app_views = Blueprint('app_views', __name__, url_prefix='')  # nopep8
from api.v1.views.partner_request import *
from api.v1.views.waka_connect import *
from api.v1.views.cohort import *
from api.v1.views.user import *
from api.v1.views.github_login import *
from api.v1.views.login import *
from api.v1.views.waka_stats import *
from api.v1.views.index import *
from api.v1.views.git_stats import *
