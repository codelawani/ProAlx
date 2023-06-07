from faker import Faker
from models.user import User
from models import storage
import random
from datetime import datetime, timedelta
from models.cohort import Cohort
from models.request import RequestedPartners
from models.engine.DBExceptions import DatabaseException
from mysql.connector import Error
fake = Faker()
# If u want the fake data to be location specific
# use this:
# fake = Faker('ja_JP') 🌚 -- maybe Uchiha Itachi will pop up
# sadly Nigeria unavailable 😮‍💨


def generate_random_boolean():
    return fake.random_element(elements=(True, False))

# Usage


def create_fake_users():
    users = []
    for i in range(40):
        total_seconds = random.randint(0, 1000000)
        random_boolean = generate_random_boolean()
        daily_average = total_seconds // 7
        end_date = datetime.now() + timedelta(days=90)
        user = User(
            name=fake.name(),
            photo_url=fake.image_url(),
            username=fake.user_name(),
            twitter_username=fake.user_name(),
            whatsapp=fake.phone_number(),
            email=fake.email(),
            github_uid=fake.random_int(),
            wakatime_uid=str(fake.uuid4()),
            gh_access_token=str(fake.uuid4()),
            wk_access_token=str(fake.uuid4()),
            wk_refresh_token=str(fake.uuid4()),
            waka_token_expires=fake.date_time_between(
                start_date=datetime.now(), end_date=end_date),
            waka_week_total_seconds=total_seconds,
            waka_week_daily_average=daily_average,
            likes_interests=' '.join(fake.words()),
            most_active_time=fake.random_element(
                elements=('morning', 'afternoon', 'evening', 'night')),
            timezone=fake.timezone(),
            github_session=random_boolean,
            waka_connected=random_boolean,
            github_login=fake.user_name(),
            wakatime_login=fake.user_name(),
        )
        try:
            storage.new(user)
            users.append(user)
            print(f'Created {i + 1} user(s)')
        except DatabaseException:
            print('Failed to create user')
            print('moving on ...')
    return users


def create_fake_requests(users):
    for user in users:
        number_of_partners = fake.random_int(min=0, max=2)
        requested_partners = RequestedPartners(
            number=number_of_partners, user=user)
        storage.new(requested_partners)
        print(f'Created {number_of_partners} request(s) for {user.name}')

    storage.save()
    print("Fake requests created successfully.")


def create_fake_cohorts():
    users = create_fake_users()
    create_fake_requests(users)
    if not users:
        print("Users weren't created")
        return

    existing_cohorts = storage.all(Cohort).values()
    assigned_users = []

    for i in range(8, 15):
        cohort = find_cohort(existing_cohorts, i)

        if cohort is None:
            create_new_cohort(users, assigned_users, i)
        else:
            add_users_to_cohort(users, assigned_users, cohort)


def find_cohort(existing_cohorts, number):
    for cohort in existing_cohorts:
        if cohort.number == number:
            return cohort
    return None


def create_new_cohort(users, assigned_users, number):
    available_users = [user for user in users if user not in assigned_users]

    if not available_users:
        print('No available users')
        return

    cohort_users = random.sample(available_users, k=5)
    cohort = Cohort(name=fake.word(), number=number, users=cohort_users)
    assigned_users.extend(cohort_users)

    try:
        storage.new(cohort)
        print('Creating cohort', number)
    except DatabaseException:
        print('Failed to create new cohort')
        print('moving on ...')


def add_users_to_cohort(users, assigned_users, cohort):
    available_users = [user for user in users if user not in assigned_users]

    if not available_users:
        print('No available users')
        return

    cohort_users = random.sample(available_users, k=5)
    cohort.users.extend(cohort_users)
    assigned_users.extend(cohort_users)

    try:
        cohort.save()
        print(f'Updating cohort {cohort.number}')
    except Error as e:
        print(e)


create_fake_cohorts()
