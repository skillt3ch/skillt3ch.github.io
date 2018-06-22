#! /usr/bin/env python

ticket = raw_input("Enter ticket subject: ")

arr = ticket.split("-")

reordered = "\n" + arr[0] + "-" + arr[2] + "-" + arr[1] + "-" + arr[3] + "-" + arr[4] + "\n"

print reordered