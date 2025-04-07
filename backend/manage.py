#!/usr/bin/env python
import os
import sys

def main():
    sys.path.append(os.path.join(os.path.dirname(__file__), 'budget_tracker'))
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'budget_tracker.settings')
    try:
        from django.core.management import execute_from_command_line
    except ImportError:
        raise ImportError(
            "Couldn't import Django. Are you sure it's installed and "
            "available on your PYTHONPATH environment variable?"
        )
    execute_from_command_line(sys.argv)

if __name__ == '__main__':
    main()
