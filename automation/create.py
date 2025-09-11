import os
import time
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import Select
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import pandas as pd

os.environ['PATH'] += r"D:\Installations\Driver"
driver = webdriver.Chrome()

# platform testing
driver.get("http://localhost:4200/apply")
driver.implicitly_wait(5)

# apply leave
driver.get("http://localhost:4200/apply")
driver.implicitly_wait(5)
time.sleep(1)
driver.maximize_window()
time.sleep(1)

df = pd.read_excel("new_leave_data.xlsx")

for index,row in df.iterrows():
    leave_type = row["type"]
    toDate = row["to_date"]
    fromDate = row["from_date"]
    reason = row["reason"]

    dropdown = Select(driver.find_element(By.ID, "type"))
    time.sleep(1)
    dropdown.select_by_visible_text(leave_type)
    time.sleep(1)

    driver.find_element(By.ID, "from_date").send_keys(fromDate)
    time.sleep(1)

    driver.find_element(By.ID, "to_date").send_keys(toDate)
    time.sleep(1)

    driver.find_element(By.ID, "reason").send_keys(reason)
    time.sleep(1)

    driver.find_element(By.ID, "submitBtn").click()
    time.sleep(1)